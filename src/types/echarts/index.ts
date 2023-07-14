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
  grid?: Arrayable<any>
  polar?: Arrayable<any>
  radiusAxis?: Arrayable<any>
  angleAxis?: Arrayable<any>
  radar?: Arrayable<any>
  dataZoom?: Arrayable<any>
  visualMap?: Arrayable<any>
  tooltip?: Arrayable<any>
  axisPointer?: Arrayable<any>
  toolbox?: Arrayable<any>
  brush?: Arrayable<any>
  geo?: Arrayable<any>
  parallel?: Arrayable<any>
  parallelAxis?: Arrayable<any>
  singleAxis?: Arrayable<any>
  timeline?: Arrayable<any>
  graphic?: Arrayable<any>
  calendar?: Arrayable<any>
  dataset?: Arrayable<any>
  aria?: Arrayable<any>
  textStyle?: Arrayable<any>
  stateAnimation?: any

  // 3d
  globe?: Arrayable<any>
  geo3D?: Arrayable<any>
  mapbox3D?: Arrayable<any>
  grid3D?: Arrayable<any>
  xAxis3D?: Arrayable<any>
  yAxis3D?: Arrayable<any>
  zAxis3D?: Arrayable<any>
}
