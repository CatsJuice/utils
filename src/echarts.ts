import cloneDeep from 'lodash-es/cloneDeep'
import merge from 'lodash-es/merge'

import type { EChartsOption } from './types/echarts'
import { getArrayableFirst } from './echarts/arrayable-first'

/**
 * ECharts 配置项加工器
 */
export class ECProcessor<T extends EChartsOption = EChartsOption> {
  constructor(public chartOptions: T) {}

  /** 分割值坐标 */
  public splitValueAxis(opt?: {
    valueAxis?: 'yAxis' | 'xAxis'
    /** 要分割到副坐标轴的series的名称 */
    splitSeriesNames?: string[]
  }) {
    const options = this.chartOptions
    const { valueAxis = 'yAxis', splitSeriesNames } = opt || {}

    let axis = options[valueAxis]
    if (!axis) throw new Error('valueAxis is not defined')
    if (!Array.isArray(axis)) axis = this.chartOptions[valueAxis] = [axis]
    if (axis.length === 0) throw new Error('valueAxis is empty array')
    const newAxis = cloneDeep(axis[0] || {})
    axis.push(newAxis)
    const axisIndex = axis.length - 1

    const legend = getArrayableFirst(options.legend) || {}
    options.legend = legend

    // 分割坐标轴
    const series = options.series
    if (!series) throw new Error('series is not defined')
    if (!Array.isArray(series)) throw new Error('series is not array')
    if (!splitSeriesNames) {
      // 没有指定，默认将除了第一个series之外的series分割到副坐标轴
      for (let i = 1; i < series.length; i++)
        series[i][`${valueAxis}Index`] = axisIndex
    }
    else {
      // 指定了要分割的series
      for (let i = 0; i < series.length; i++) {
        if (splitSeriesNames.includes(series[i].name || ''))
          series[i][`${valueAxis}Index`] = axisIndex
      }
    }
    const seriesNames = series.slice(1).map(item => item.name)
    // 将图例添加上左右的区别
    legend.formatter = (name: string) =>
      splitSeriesNames
        ? splitSeriesNames.includes(name)
          ? `${name}（右）`
          : `${name}（左）`
        : seriesNames.includes(name)
          ? `${name}（右）`
          : `${name}（左）`
    return this
  }

  /** 将目标对象合并到当前的配置上 （目标对象的配置会覆盖当前的配置） */
  public mergeFrom(...targets: T[]) {
    this.chartOptions = merge(this.chartOptions, ...targets)
    return this
  }

  /** 将当前的配置合并到目标对象上（当前的配置会覆盖目标对象的配置） */
  public mergeInto(...targets: T[]) {
    this.chartOptions = merge({}, ...targets, this.chartOptions)
    return this
  }

  /** 输出当前的配置 */
  log() {
    // eslint-disable-next-line no-console
    console.log(cloneDeep(this.chartOptions))
    return this
  }

  /** 输出当前配置项的 json */
  json() {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(this.chartOptions))
    return this
  }

  /** 获取一个新的实例，为当前状态的一个复制 */
  clone() { return new ECProcessor(cloneDeep(this.chartOptions)) }

  /** 获取最终的配置 */
  get() { return this.chartOptions }
}
