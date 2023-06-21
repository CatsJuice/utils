import type { Arrayable } from '../../type'

export type EChartsOption = EChartsBaseOption

export interface EChartsTitle {
  /** 组件 ID。默认不指定。指定则可用于在 option 或者 API 中引用组件 */
  id?: string

  /** 是否显示标题组件。 */
  show?: boolean

  /** 主标题文本，支持使用 \n 换行。 */
  text?: string
}

export interface EChartsAxis {
  name?: string
  type: 'value' | 'category'
}

export interface EChartsLegend {
  name?: string
  formatter?: string | ((name: string) => string)
}

export interface EChartsSeries {
  name?: string
  yAxisIndex?: number
  xAxisIndex?: number
}

export interface EChartsBaseOption {
  title?: Arrayable<EChartsTitle>
  xAxis?: Arrayable<EChartsAxis>
  yAxis?: Arrayable<EChartsAxis>
  legend?: Arrayable<EChartsLegend>
  series?: Arrayable<EChartsSeries>
}
