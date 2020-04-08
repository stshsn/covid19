/**
 * Fukui covid-19 open data getting script
 * include feature downloading news spreadsheet
 * Copyright © HyodaKazuaki
 */

const path = require('path')
const fs = require('fs')
const axios = require('axios')
const csv2json = require('csvtojson')
const Enumerable = require('linq')
const iconv = require('iconv-lite')

/**
 * Shift-JISフラグ
 */
const ISSHIFTJIS = true

/**
 * 病床数
 */
const HospitalBedNum = 84

/**
 * オープンデータ取得先
 */
const openDataSource = [
  {
    name: 'call_center',
    url:
      'https://www.pref.fukui.lg.jp/doc/toukei-jouhou/covid-19_d/fil/covid19_call_center.csv'
  },
  {
    name: 'confirm_negative',
    url:
      'https://www.pref.fukui.lg.jp/doc/toukei-jouhou/covid-19_d/fil/covid19_confirm_negative.csv'
  },
  {
    name: 'patients',
    url:
      'https://www.pref.fukui.lg.jp/doc/toukei-jouhou/covid-19_d/fil/covid19_patients.csv'
  },
  {
    name: 'test_count',
    url:
      'https://www.pref.fukui.lg.jp/doc/toukei-jouhou/covid-19_d/fil/covid19_test_count.csv'
  }
]

/**
 * ニュースデータ取得先
 */
const newsURL =
  'https://script.googleusercontent.com/macros/echo?user_content_key=PYdskn-DTyGWV-opQBIPMai2hf_fFAN4QEmRbzTslY_Wk87YfJO9j9H3ity-FUaFPy1pksmbx2n_xtdxmYsKNAQ8OsCGB2Tbm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnIEfRmCr39HTGQrTUSiWR0O7CYjXcSKXdkQgDZghk6tW42sA2IpyDGOwsQ9LRFT_DlHTmz_2mixm&lib=MA39SnUYxoNd8lbNHqVdiBtdTRtZCTy75'

/**
 * jsonファイルの階層
 */
const dir = '../data/'

/**
 * jsonのファイル名
 */
const files = {
  breakingNews: 'breaking_news.json', // 速報
  fukuiNews: 'fukui_news.json', // 県内のお知らせ
  japanNews: 'japan_news.json', // 国内のお知らせ
  hospitalBeds: 'hospital_beds.json', // 感染症病床使用率
  inspectionPersons: 'inspection_persons.json', // 検査実施人数
  inspectionSummary: 'inspection_summary.json', // 検査陽性者の状況
  patientsSummary: 'patients_summary.json', // 陽性患者数
  patients: 'patients.json' // 陽性患者の属性
}

const main = async () => {
  // オープンデータ取得
  for (const source of openDataSource) {
    const csv = await getCSV(source.url)
    const json = await csv2json().fromString(csv)
    source.json = json
  }
  // ニュースデータ取得
  const newsJson = (await axios.get(newsURL)).data
  const breakingNewsJson = newsJson.breaking_news
  const fukuiNewsJson = newsJson.fukui_news
  const japanNewsJson = newsJson.japan_news

  // オープンデータ
  const jsonObjectBase = {
    date: dateFormat.format(new Date(), 'yyyy/MM/dd hh:mm')
  }
  // 各JSONを作成
  const hospitalBedsJson = Object.assign({}, jsonObjectBase)
  const inspectionPersonsJson = Object.assign({}, jsonObjectBase)
  const inspectionSummaryJson = Object.assign({}, jsonObjectBase)
  const patientsJson = Object.assign({}, jsonObjectBase)
  const patientsSummaryJson = Object.assign({}, jsonObjectBase)
  // LINQの設定
  const linq = Enumerable.from(openDataSource)
  // 各JSONの処理
  hospitalBeds(
    linq.where(x => x.name === 'patients').first().json,
    hospitalBedsJson
  )
  inspectionPersons(
    linq.where(x => x.name === 'test_count').first().json,
    inspectionPersonsJson
  )
  inspectionSummary(
    linq.where(x => x.name === 'patients').first().json,
    inspectionSummaryJson
  )
  patients(linq.where(x => x.name === 'patients').first().json, patientsJson)
  patientsSummary(
    linq.where(x => x.name === 'patients').first().json,
    patientsSummaryJson
  )

  // 書き出し
  writeFile(breakingNewsJson, files.breakingNews)
  writeFile(fukuiNewsJson, files.fukuiNews)
  writeFile(japanNewsJson, files.japanNews)
  writeFile(hospitalBedsJson, files.hospitalBeds)
  writeFile(inspectionPersonsJson, files.inspectionPersons)
  writeFile(inspectionSummaryJson, files.inspectionSummary)
  writeFile(patientsJson, files.patients)
  writeFile(patientsSummaryJson, files.patientsSummary)
}

async function getCSV(URL) {
  if (ISSHIFTJIS) {
    const data = (await axios.get(URL, { responseType: 'arraybuffer' })).data
    return iconv.decode(Buffer.from(data), 'windows-31j')
  }
  const data = (await axios.get(URL)).data
  return data
}

function writeFile(json, fileName) {
  const filePath = path.join(dir, fileName)
  fs.writeFile(filePath, JSON.stringify(json, null, '    '), err => {
    if (err) console.error(err)
  })
}

function hospitalBeds(json, jsonObject) {
  const patient = Enumerable.from(json)
  const hospitalized = x =>
    x.患者_状態 !== '死亡' && parseInt(x.患者_退院済フラグ) !== 1
  const usedNum = patient.where(hospitalized).count()
  jsonObject.data = {
    used: usedNum,
    unused: HospitalBedNum - usedNum
  }
  jsonObject.labels = ['現在患者数', '空き病床数(推定)']
}

function inspectionPersons(json, jsonObject) {
  jsonObject.data = { 県内: [] }
  jsonObject.labels = []
  Enumerable.from(json).forEach(row => {
    const date = new Date(row['実施_年月日'])
    jsonObject.data.県内.push(row['検査実施_件数'])
    jsonObject.labels.push(`${date.getMonth() + 1}/${date.getDate()}`)
  })
}

function inspectionSummary(json, jsonObject) {
  const patient = Enumerable.from(json)
  const hospitalized = x =>
    x.患者_状態 !== '死亡' && parseInt(x.患者_退院済フラグ) === 0
  const mildOrModerate = x =>
    (x.患者_状態 === '軽症' ||
      x.患者_状態 === '中等症' ||
      x.患者_状態 === '') &&
    parseInt(x.患者_退院済フラグ) === 0
  const severeOrSerious = x =>
    (x.患者_状態 === '重症' || x.患者_状態 === '重篤') &&
    parseInt(x.患者_退院済フラグ) === 0
  const dead = x => x.患者_状態 === '死亡'
  const discharge = x =>
    parseInt(x.患者_退院済フラグ) === 1 && x.患者_状態 !== '死亡'
  jsonObject.children = [
    {
      attr: '陽性患者数',
      value: patient.count(),
      children: [
        {
          attr: '入院中',
          value: patient.where(hospitalized).count(),
          children: [
            {
              attr: '軽症・中等症',
              value: patient.where(mildOrModerate).count()
            },
            {
              attr: '重症',
              value: patient.where(severeOrSerious).count()
            }
          ]
        },
        {
          attr: '死亡',
          value: patient.where(dead).count()
        },
        {
          attr: '退院',
          value: patient.where(discharge).count()
        },
        {
          attr: '自宅療養',
          value: '不明'
        },
        {
          attr: '宿泊施設等',
          value: '不明'
        }
      ]
    }
  ]
}

function patients(json, jsonObject) {
  jsonObject.data = []
  Enumerable.from(json).forEach(row => {
    let publicationDate = '不明'
    if (row.公表_年月日 !== '') {
      const day = new Date(row.公表_年月日)
      publicationDate = dateFormat.format(day, 'yyyy-MM-dd')
      publicationDate = `${publicationDate}T00:00:00.000+09:00`
    }
    let developmentDate = '不明'
    if (row.発症_年月日 !== '') {
      const day = new Date(row.発症_年月日)
      developmentDate = dateFormat.format(day, 'yyyy-MM-dd')
      developmentDate = `${developmentDate}T00:00:00.000+09:00`
    }
    const newObj = {
      公表日: publicationDate,
      発症日: developmentDate,
      居住地: row['患者_居住地'],
      年代: row['患者_年代'],
      性別: row['患者_性別'],
      職業: row['患者_職業'],
      状態: row['患者_状態'],
      症状: row['患者_症状'],
      渡航歴: row['患者_渡航歴の有無フラグ'],
      退院: row['患者_退院済フラグ'],
      備考: row['備考']
    }
    jsonObject.data.push(newObj)
  })
}

function patientsSummary(json, jsonObject) {
  jsonObject.data = []
  // 最初の日
  const initDay = new Date('2020-02-16')
  const today = new Date()
  const diffDay = parseInt((today - initDay) / (1000 * 60 * 60 * 24)) // 日の差分
  for (let i = 0; i <= diffDay; i++) {
    const targetDay = new Date(initDay.toDateString())
    targetDay.setDate(targetDay.getDate() + i)
    const number = Enumerable.from(json)
      .where(x => new Date(x.公表_年月日).getTime() === targetDay.getTime())
      .count()
    const day = new Date(initDay)
    day.setDate(day.getDate() + i)
    day.setHours(day.getHours() + 9) // UTC to JST
    const formatDay = dateFormat.format(day, 'yyyy-MM-dd')
    const newObj = {
      日付: `${formatDay}T00:00:00.000+09:00`,
      小計: number
    }
    jsonObject.data.push(newObj)
  }
}

const dateFormat = {
  _fmt: {
    yyyy(date) {
      return date.getFullYear() + ''
    },
    MM(date) {
      return ('0' + (date.getMonth() + 1)).slice(-2)
    },
    dd(date) {
      return ('0' + date.getDate()).slice(-2)
    },
    hh(date) {
      return ('0' + date.getHours()).slice(-2)
    },
    mm(date) {
      return ('0' + date.getMinutes()).slice(-2)
    },
    ss(date) {
      return ('0' + date.getSeconds()).slice(-2)
    }
  },
  _priority: ['yyyy', 'MM', 'dd', 'hh', 'mm', 'ss'],
  format(date, format) {
    return this._priority.reduce(
      (res, fmt) => res.replace(fmt, this._fmt[fmt](date)),
      format
    )
  }
}

main()
