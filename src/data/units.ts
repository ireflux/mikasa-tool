import type { UnitConverterConfig } from '@/utils/unit'

export const unitConverters: UnitConverterConfig[] = [
  {
    id: 'length',
    groups: [
      {
        title: 'unit.group.metric',
        baseKey: 'm',
        baseFactor: 1,
        units: [
          { key: 'km', label: 'unit.length.km', ratio: 1000 },
          { key: 'm', label: 'unit.length.m', ratio: 1 },
          { key: 'dm', label: 'unit.length.dm', ratio: 0.1 },
          { key: 'cm', label: 'unit.length.cm', ratio: 0.01 },
          { key: 'mm', label: 'unit.length.mm', ratio: 0.001 },
          { key: 'dmm', label: 'unit.length.dmm', ratio: 0.0001 },
          { key: 'um', label: 'unit.length.um', ratio: 1e-6 },
          { key: 'nm', label: 'unit.length.nm', ratio: 1e-9 },
        ],
      },
      {
        title: 'unit.group.tradition',
        baseKey: 'tradition_chi',
        baseFactor: 1 / 3,
        units: [
          { key: 'tradition_li', label: 'unit.length.li', ratio: 1500 },
          { key: 'tradition_zhang', label: 'unit.length.zhang', ratio: 10 },
          { key: 'tradition_chi', label: 'unit.length.chi', ratio: 1 },
          { key: 'tradition_cun', label: 'unit.length.cun', ratio: 0.1 },
          { key: 'tradition_fen', label: 'unit.length.fen', ratio: 0.01 },
          { key: 'tradition_mill', label: 'unit.length.mill', ratio: 0.001 },
          { key: 'tradition_hao', label: 'unit.length.hao', ratio: 0.0001 },
        ],
      },
      {
        title: 'unit.group.eng',
        baseKey: 'eng_ft',
        baseFactor: 0.3048,
        units: [
          { key: 'eng_nmi', label: 'unit.length.nmi', ratio: 1852 / 0.3048 },
          { key: 'eng_fm', label: 'unit.length.fm', ratio: 6 },
          { key: 'eng_mi', label: 'unit.length.mi', ratio: 5280 },
          { key: 'eng_fur', label: 'unit.length.fur', ratio: 660 },
          { key: 'eng_yd', label: 'unit.length.yd', ratio: 3 },
          { key: 'eng_ft', label: 'unit.length.ft', ratio: 1 },
          { key: 'eng_in', label: 'unit.length.in', ratio: 1 / 12 },
        ],
      },
    ],
  },
  {
    id: 'area',
    groups: [
      {
        title: 'unit.group.metric',
        baseKey: 'm',
        baseFactor: 1,
        units: [
          { key: 'km', label: 'unit.area.km', ratio: 1e6 },
          { key: 'm', label: 'unit.area.m', ratio: 1 },
          { key: 'dm', label: 'unit.area.dm', ratio: 0.01 },
          { key: 'cm', label: 'unit.area.cm', ratio: 0.0001 },
          { key: 'mm', label: 'unit.area.mm', ratio: 1e-6 },
          { key: 'ha', label: 'unit.area.ha', ratio: 10000 },
        ],
      },
      {
        title: 'unit.group.tradition',
        baseKey: 'tradition_mu',
        baseFactor: 2000 / 3,
        units: [
          { key: 'tradition_mu', label: 'unit.area.mu', ratio: 1 },
          { key: 'tradition_fen', label: 'unit.area.fen', ratio: 0.1 },
          { key: 'tradition_mill', label: 'unit.area.mill', ratio: 0.01 },
          { key: 'tradition_hao', label: 'unit.area.hao', ratio: 0.001 },
        ],
      },
      {
        title: 'unit.group.eng',
        baseKey: 'eng_ft',
        baseFactor: 0.09290304,
        units: [
          { key: 'eng_nmi', label: 'unit.area.nmi', ratio: (1852 / 0.3048) ** 2 },
          { key: 'eng_mi', label: 'unit.area.mi', ratio: 5280 ** 2 },
          { key: 'eng_acre', label: 'unit.area.acre', ratio: 43560 },
          { key: 'eng_rd', label: 'unit.area.rd', ratio: 272.25 },
          { key: 'eng_yd', label: 'unit.area.yd', ratio: 9 },
          { key: 'eng_ft', label: 'unit.area.ft', ratio: 1 },
          { key: 'eng_in', label: 'unit.area.in', ratio: 1 / 144 },
        ],
      },
    ],
  },
  {
    id: 'weight',
    groups: [
      {
        title: 'unit.group.metric',
        baseKey: 'g',
        baseFactor: 1,
        units: [
          { key: 't', label: 'unit.weight.t', ratio: 1e6 },
          { key: 'kg', label: 'unit.weight.kg', ratio: 1000 },
          { key: 'g', label: 'unit.weight.g', ratio: 1 },
          { key: 'mg', label: 'unit.weight.mg', ratio: 0.001 },
        ],
      },
      {
        title: 'unit.group.tradition',
        baseKey: 'jin',
        baseFactor: 500,
        units: [
          { key: 'jin', label: 'unit.weight.jin', ratio: 1 },
          { key: 'liang', label: 'unit.weight.liang', ratio: 0.1 },
          { key: 'qian', label: 'unit.weight.qian', ratio: 0.01 },
          { key: 'dan', label: 'unit.weight.dan', ratio: 100 },
        ],
      },
      {
        title: 'unit.group.eng',
        baseKey: 'eng_lb',
        baseFactor: 453.59237,
        units: [
          { key: 'eng_lb', label: 'unit.weight.lb', ratio: 1 },
          { key: 'eng_oz', label: 'unit.weight.oz', ratio: 1 / 16 },
          { key: 'eng_st', label: 'unit.weight.st', ratio: 14 },
          { key: 'eng_cwt', label: 'unit.weight.cwt', ratio: 112 },
          { key: 'eng_dr', label: 'unit.weight.dr', ratio: 1 / 256 },
          { key: 'eng_gr', label: 'unit.weight.gr', ratio: 1 / 7000 },
          { key: 'eng_lt', label: 'unit.weight.lt', ratio: 2240 },
        ],
      },
      {
        title: 'unit.group.engTroy',
        baseKey: 'eng_lbt',
        baseFactor: 373.2417216,
        units: [
          { key: 'eng_lbt', label: 'unit.weight.lbt', ratio: 1 },
          { key: 'eng_ozt', label: 'unit.weight.ozt', ratio: 1 / 12 },
          { key: 'eng_grain', label: 'unit.weight.grain', ratio: 1 / 5760 },
          { key: 'eng_dwt', label: 'unit.weight.dwt', ratio: 1 / 240 },
        ],
      },
    ],
  },
  {
    id: 'time',
    groups: [
      {
        title: 'unit.group.time',
        baseKey: 's',
        baseFactor: 1,
        units: [
          { key: 'year', label: 'unit.time.year', ratio: 31536000 },
          { key: 'month', label: 'unit.time.month', ratio: 2629800 },
          { key: 'd', label: 'unit.time.d', ratio: 86400 },
          { key: 'h', label: 'unit.time.h', ratio: 3600 },
          { key: 'min', label: 'unit.time.min', ratio: 60 },
          { key: 's', label: 'unit.time.s', ratio: 1 },
          { key: 'ms', label: 'unit.time.ms', ratio: 0.001 },
          { key: 'week', label: 'unit.time.week', ratio: 604800 },
        ],
      },
    ],
  },
  {
    id: 'temperature',
    groups: [
      {
        title: 'unit.group.temp',
        baseKey: 'c',
        baseFactor: 1,
        units: [
          { key: 'c', label: 'unit.temperature.c', ratio: 1 },
          { key: 'f', label: 'unit.temperature.f', ratio: 5 / 9, offset: -32 },
          { key: 'k', label: 'unit.temperature.k', ratio: 1, offset: -273.15 },
          { key: 're', label: 'unit.temperature.re', ratio: 1.25 },
          { key: 'r', label: 'unit.temperature.r', ratio: 5 / 9, offset: -491.67 },
        ],
      },
    ],
  },
  {
    id: 'pressure',
    groups: [
      {
        title: 'unit.group.pressure',
        baseKey: 'pa',
        baseFactor: 1,
        units: [
          { key: 'pa', label: 'unit.pressure.pa', ratio: 1 },
          { key: 'hpa', label: 'unit.pressure.hpa', ratio: 100 },
          { key: 'kpa', label: 'unit.pressure.kpa', ratio: 1000 },
          { key: 'mpa', label: 'unit.pressure.mpa', ratio: 1e6 },
          { key: 'bar', label: 'unit.pressure.bar', ratio: 1e5 },
          { key: 'torr', label: 'unit.pressure.torr', ratio: 133.322368 },
          { key: 'psi', label: 'unit.pressure.psi', ratio: 6894.76 },
        ],
      },
    ],
  },
  {
    id: 'heat',
    groups: [
      {
        title: 'unit.group.heat',
        baseKey: 'wh',
        baseFactor: 1,
        units: [
          { key: 'wh', label: 'unit.heat.wh', ratio: 1 },
          { key: 'mmwh', label: 'unit.heat.mmwh', ratio: 0.001 },
          { key: 'kwh', label: 'unit.heat.kwh', ratio: 1000 },
          { key: 'mwh', label: 'unit.heat.mwh', ratio: 1e6 },
          { key: 'j', label: 'unit.heat.j', ratio: 1 / 3600 },
          { key: 'kj', label: 'unit.heat.kj', ratio: 1 / 3.6 },
        ],
      },
    ],
  },
  {
    id: 'power',
    groups: [
      {
        title: 'unit.group.power',
        baseKey: 'w',
        baseFactor: 1,
        units: [
          { key: 'w', label: 'unit.power.w', ratio: 1 },
          { key: 'mmw', label: 'unit.power.mmw', ratio: 0.001 },
          { key: 'kw', label: 'unit.power.kw', ratio: 1000 },
          { key: 'mw', label: 'unit.power.mw', ratio: 1e6 },
          { key: 'gw', label: 'unit.power.gw', ratio: 1e9 },
        ],
      },
    ],
  },
]
