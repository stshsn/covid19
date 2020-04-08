type DataType = {
  children: [
    {
      attr: '陽性患者数'
      value: number
      children: [
        {
          attr: '入院中'
          value: number
          children: [
            {
              attr: '軽症・中等症'
              value: number
            },
            {
              attr: '重症'
              value: number
            }
          ]
        },
        {
          attr: '退院'
          value: number
        },
        {
          attr: '死亡'
          value: number
        },
        {
          attr: '自宅療養'
          value: number
        },
        {
          attr: '宿泊施設等'
          value: number
        }
      ]
    }
  ]
}

type ConfirmedCasesType = {
  陽性物数: number
  入院中: number
  軽症中等症: number
  重症: number
  死亡: number
  退院: number
  自宅療養: number
  宿泊施設等: number
}

/**
 * Format for *Chart component
 *
 * @param data - Raw data
 */
export default (data: DataType) => {
  const formattedData: ConfirmedCasesType = {
    陽性物数: data.children[0].value,
    入院中: data.children[0].children[0].value,
    軽症中等症: data.children[0].children[0].children[0].value,
    重症: data.children[0].children[0].children[1].value,
    死亡: data.children[0].children[1].value,
    退院: data.children[0].children[2].value,
    自宅療養: data.children[0].children[3].value,
    宿泊施設等: data.children[0].children[4].value
  }
  return formattedData
}
