type DataType = {
  日付: Date
  入院: number
  退院: number
}

export type GraphDataType = {
  label: string
  hospitalized: number
  discharge: number
  cumulative: number
}

/**
 * Format for *Chart component
 *
 * @param data - Raw data
 */
export default (data: DataType[]) => {
  const graphData: GraphDataType[] = []
  const today = new Date()
  let patSum = 0
  data
    .filter(d => new Date(d['日付']) < today)
    .forEach(d => {
      const date = new Date(d['日付'])
      const subTotal = d['入院'] - d['退院']
      if (!isNaN(subTotal)) {
        patSum += subTotal
        graphData.push({
          label: `${date.getMonth() + 1}/${date.getDate()}`,
          hospitalized: d['入院'],
          discharge: d['退院'],
          cumulative: patSum
        })
      }
    })
  return graphData
}
