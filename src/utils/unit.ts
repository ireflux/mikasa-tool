export interface UnitItem {
  key: string
  /** i18n key，如 unit.length.km */
  label: string
  /** 相对本组基准单位的换算系数 */
  ratio: number
  /** 线性偏移（温度等单位需要） */
  offset?: number
}

export interface UnitGroup {
  /** 分组标题 i18n key */
  title: string
  /** 本组基准单位 key（必须存在于 units 中，ratio 为 1） */
  baseKey: string
  /** 本组基准单位相对整体基准单位的换算系数 */
  baseFactor: number
  /** 本组基准单位相对整体基准单位的偏移 */
  baseOffset?: number
  units: UnitItem[]
}

export interface UnitConverterConfig {
  id: string
  groups: UnitGroup[]
}

/** 去除浮点噪声，最多保留 12 位有效数字 */
export const trimNumber = (v: number): number => {
  if (!Number.isFinite(v)) return v
  return Number(v.toPrecision(12))
}

/**
 * 单位转换：将 key 指定的单位的值换算为其他所有单位
 * @param config 转换器配置
 * @param values 各单位当前值（原地更新）
 * @param key 输入单位 key
 */
export const convertUnits = (
  config: UnitConverterConfig,
  values: Record<string, string | number>,
  key: string,
): Record<string, string | number> => {
  const src = values[key]
  if (src === '' || src === null || src === undefined) return values
  const num = Number(src)
  if (!Number.isFinite(num)) return values

  const group = config.groups.find((g) => g.units.some((u) => u.key === key))
  const item = group?.units.find((u) => u.key === key)
  if (!group || !item) return values

  const base = ((num + (item.offset ?? 0)) * item.ratio) * group.baseFactor + (group.baseOffset ?? 0)

  for (const g of config.groups) {
    const gVal = (base - (g.baseOffset ?? 0)) / g.baseFactor
    for (const u of g.units) {
      if (u.key === key) {
        values[u.key] = src
      } else {
        values[u.key] = trimNumber(gVal / u.ratio - (u.offset ?? 0))
      }
    }
  }
  return values
}

export const findUnit = (config: UnitConverterConfig, key: string) => {
  for (const group of config.groups) {
    const item = group.units.find((u) => u.key === key)
    if (item) return { group, item }
  }
  return null
}
