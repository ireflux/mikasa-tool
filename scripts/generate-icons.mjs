/**
 * Material 3 风格工具图标生成器
 *
 * 设计规范：
 * - 画布 viewBox 0 0 48 48，圆角方块 rx=12（M3 大圆角）
 * - 符号位于居中 24×24 区域（g translate(12 12)），Material Symbols 线性风格：
 *   2px 描边、圆角端点/拐角、无填充
 * - 配色：Google pastel 底 + 同色系深色符号，按分类着色
 *
 * 用法：node scripts/generate-icons.mjs
 * 新增工具图标：在 ICONS 表中添加一项（key 即输出文件名），重新运行即可。
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = join(ROOT, 'public', 'images', 'logo')

/** 分类配色：底 / 符号 */
const CATS = {
  dev:   { bg: '#d3e3fd', fg: '#0b57d0' }, // 开发运维（蓝）
  text:  { bg: '#ceead6', fg: '#188038' }, // 文本处理（绿）
  edu:   { bg: '#feefc3', fg: '#e37400' }, // 教育学术（黄）
  img:   { bg: '#fad2cf', fg: '#d93025' }, // 图片处理（红粉）
  chart: { bg: '#e9d2fd', fg: '#8e24aa' }, // 数据图表（紫）
  rand:  { bg: '#cdeef2', fg: '#007b83' }, // 选择随机（青）
  misc:  { bg: '#e3e7ec', fg: '#444746' }, // 其他工具（中性灰）
}

/** 实心圆点（fill 取分类符号色） */
const dot = (cx, cy, r = 1.1) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="FILL" stroke="none"/>`

/** 文本符号（fill 取分类符号色） */
const txt = (str, size, y, opts = {}) =>
  `<text x="${opts.x ?? 12}" y="${y}" text-anchor="middle" font-family="${opts.font ?? 'Arial, Helvetica, sans-serif'}" font-size="${size}" font-weight="${opts.weight ?? 700}"${opts.spacing ? ` letter-spacing="${opts.spacing}"` : ''} fill="FILL" stroke="none">${str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>`

/**
 * 图标定义表：key = 输出文件名（路由 key 小写），cat = 分类，glyph = 24×24 坐标系符号
 */
const ICONS = {
  // ================= 开发运维 dev =================
  randompassword: {
    cat: 'dev',
    glyph: `<circle cx="7" cy="12" r="3.5"/><path d="M10.5 12H20"/><path d="M15.5 12v3"/><path d="M18.8 12v3"/>`,
  },
  urlencode: {
    cat: 'dev',
    glyph: `<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>`,
  },
  uuid: {
    cat: 'dev',
    glyph: `<path d="M4 9h16"/><path d="M4 15h16"/><path d="M10 3 8 21"/><path d="M16 3l-2 18"/>`,
  },
  timetran: {
    cat: 'dev',
    glyph: `<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/>`,
  },
  md5: {
    cat: 'dev',
    glyph: `<rect x="6" y="11" width="12" height="9" rx="2"/><path d="M9 11V8a3 3 0 0 1 6 0v3"/>${dot(12, 15.5)}`,
  },
  json: {
    cat: 'dev',
    glyph: `<path d="M9.5 5C8 5 7.5 5.8 7.5 7v2.6c0 1.2-.7 1.9-2 1.9 1.3 0 2 .7 2 1.9V17c0 1.2.5 2 2 2"/><path d="M14.5 5c1.5 0 2 .8 2 2v2.6c0 1.2.7 1.9 2 1.9-1.3 0-2 .7-2 1.9V17c0 1.2-.5 2-2 2"/>`,
  },
  reg: {
    cat: 'dev',
    glyph: `${dot(6.5, 14.5, 1.3)}<path d="M14.5 7v8"/><path d="M11 8.8l7 4.4"/><path d="M18 8.8l-7 4.4"/>`,
  },
  unicode: {
    cat: 'dev',
    glyph: txt('文A', 10, 16.5, { font: "'PingFang SC','Microsoft YaHei',sans-serif", weight: 600, spacing: 0.5 }),
  },
  httpstatuscode: {
    cat: 'dev',
    glyph: `<circle cx="12" cy="12" r="8.5"/><ellipse cx="12" cy="12" rx="3.8" ry="8.5"/><path d="M3.5 12h17"/>`,
  },
  jwt: {
    cat: 'dev',
    glyph: `<path d="M5 6h14a1 1 0 0 1 1 1v2a2 2 0 0 0 0 4v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a2 2 0 0 0 0-4V7a1 1 0 0 1 1-1Z"/><path d="M14.5 7.5v2"/><path d="M14.5 11v2"/><path d="M14.5 14.5v2"/>`,
  },
  htmlentity: {
    cat: 'dev',
    glyph: txt('&', 16, 17.5, { font: 'Georgia, serif' }),
  },
  jsformat: {
    cat: 'dev',
    glyph: txt('JS', 10.5, 16.5, { spacing: 0.5 }),
  },
  htmlformat: {
    cat: 'dev',
    glyph: `<path d="M9 7l-5 5 5 5"/><path d="M15 7l5 5-5 5"/>`,
  },
  cssformat: {
    cat: 'dev',
    glyph: txt('CSS', 8, 15.5, { spacing: 0.5 }),
  },
  Base64: {
    cat: 'dev',
    glyph: txt('01', 10.5, 16.5, { spacing: 1 }),
  },
  baseconverter: {
    cat: 'dev',
    glyph: `<path d="M8 3.5v12"/><path d="M5 12.5 8 15.5l3-3"/><path d="M16 20.5v-12"/><path d="M13 11.5 16 8.5l3 3"/>`,
  },
  storageconverter: {
    cat: 'dev',
    glyph: `<rect x="4" y="4.5" width="16" height="6.5" rx="1.5"/><rect x="4" y="13" width="16" height="6.5" rx="1.5"/>${dot(8, 7.75, 1)}${dot(8, 16.25, 1)}<path d="M15.5 7.75h2.5"/><path d="M15.5 16.25h2.5"/>`,
  },
  hashcalculator: {
    cat: 'dev',
    glyph: `<circle cx="12" cy="12" r="8.5"/><path d="M10.2 7.5l-1.4 9"/><path d="M15.2 7.5l-1.4 9"/><path d="M7.8 10.5h9"/><path d="M7 13.5h9"/>`,
  },
  xmlformat: {
    cat: 'dev',
    glyph: `<path d="M6 3.5h7.5L18 8v12.5H6Z"/><path d="M13.5 3.5V8H18"/><path d="M9.3 12.8 7.8 14.3l1.5 1.5"/><path d="M14.7 12.8l1.5 1.5-1.5 1.5"/>`,
  },
  sqlformat: {
    cat: 'dev',
    glyph: `<ellipse cx="12" cy="5.8" rx="7" ry="2.6"/><path d="M5 5.8v12.4c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V5.8"/><path d="M5 12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6"/>`,
  },

  // ================= 文本处理 text =================
  diff: {
    cat: 'text',
    glyph: `<rect x="4" y="5" width="7" height="14" rx="1.5"/><rect x="13" y="5" width="7" height="14" rx="1.5"/><path d="M6.2 9.5h2.6"/><path d="M16.5 8v3"/><path d="M15 9.5h3"/>`,
  },
  markdown: {
    cat: 'text',
    glyph: `<path d="M4 17.5V6.5l4 6 4-6v11"/><path d="M16.5 6.5v7.5"/><path d="M14 11.5l2.5 2.5 2.5-2.5"/>`,
  },
  wordcount: {
    cat: 'text',
    glyph: `<path d="M5 6h14"/><path d="M5 10.5h14"/>${txt('123', 8, 19, { x: 7, spacing: 1 })}`,
  },
  textremoveduplicate: {
    cat: 'text',
    glyph: `<rect x="4" y="4" width="10.5" height="10.5" rx="1.5"/><rect x="9.5" y="9.5" width="10.5" height="10.5" rx="1.5"/><path d="M15.5 4l5 5"/><path d="M20.5 4l-5 5"/>`,
  },
  asciiwordpic: {
    cat: 'text',
    glyph: txt('Aa', 11, 16.5),
  },
  textedit: {
    cat: 'text',
    glyph: `<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>`,
  },
  textreplace: {
    cat: 'text',
    glyph: `<circle cx="10.5" cy="10.5" r="5.5"/><path d="M14.5 14.5 19 19"/><path d="M8 10.5h5"/><path d="M11 8.5l2 2-2 2"/>`,
  },
  textworkflow: {
    cat: 'text',
    glyph: `<rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/><path d="M10 7h7v5.5"/><path d="M15 10l2 2.5 2-2.5"/>`,
  },
  wordfrequency: {
    cat: 'text',
    glyph: `<path d="M4 20h16"/><path d="M7.5 20v-6"/><path d="M12 20V9"/><path d="M16.5 20v-9"/>`,
  },

  // ================= 教育学术 edu =================
  unit: {
    cat: 'edu',
    glyph: `<rect x="3" y="9" width="18" height="7" rx="1.5"/><path d="M7 9v3"/><path d="M11 9v3"/><path d="M15 9v3"/><path d="M19 9v3"/>`,
  },
  morse: {
    cat: 'edu',
    glyph: `${dot(5, 8, 1.3)}<path d="M9.5 8h5"/>${dot(18, 8, 1.3)}<path d="M4 15.5h5"/>${dot(12.5, 15.5, 1.3)}<path d="M16 15.5h5"/>`,
  },
  scaletran: {
    cat: 'edu',
    glyph: `<path d="M4 8h13"/><path d="M14 5l3 3-3 3"/><path d="M20 16H7"/><path d="M10 13l-3 3 3 3"/>`,
  },
  ascii: {
    cat: 'edu',
    glyph: `<rect x="4" y="5" width="16" height="14" rx="1.5"/><path d="M4 9.5h16"/><path d="M12 9.5V19"/>`,
  },
  length: {
    cat: 'edu',
    glyph: `<g transform="rotate(-45 12 12)"><rect x="5" y="9" width="14" height="6" rx="1.5"/><path d="M8.5 9v2.5"/><path d="M11.5 9v2.5"/><path d="M14.5 9v2.5"/><path d="M17.5 9v2.5"/></g>`,
  },
  area: {
    cat: 'edu',
    glyph: `<rect x="5" y="5" width="14" height="14" rx="1.5"/><path d="M12 5v14"/><path d="M5 12h14"/>`,
  },
  weight: {
    cat: 'edu',
    glyph: `<circle cx="12" cy="6.5" r="2.5"/><path d="M8 10c-2 1.6-3 3.6-3 5.5a7 7 0 0 0 14 0c0-1.9-1-3.9-3-5.5"/>`,
  },
  time: {
    cat: 'edu',
    glyph: `<path d="M6.5 4h11"/><path d="M6.5 20h11"/><path d="M7.5 4c0 5 3 6.5 4.5 8-1.5 1.5-4.5 3-4.5 8"/><path d="M16.5 4c0 5-3 6.5-4.5 8 1.5 1.5 4.5 3 4.5 8"/>`,
  },
  temperature: {
    cat: 'edu',
    glyph: `<path d="M10 15.5V6a2 2 0 1 1 4 0v9.5a3.8 3.8 0 1 1-4 0Z"/>${dot(12, 18, 1.3)}`,
  },
  pressure: {
    cat: 'edu',
    glyph: `<path d="M4 18a8 8 0 0 1 16 0"/><path d="M12 18l3.8-5.2"/>${dot(12, 18, 1.3)}<path d="M12 10.5v1.6"/><path d="M6.3 13.5l1.4.9"/><path d="M17.7 13.5l-1.4.9"/>`,
  },
  heat: {
    cat: 'edu',
    glyph: `<path d="M12 3c1.2 3.2 5 5.3 5 9.4a5 5 0 0 1-10 0c0-1.8.7-3.4 1.9-4.8.4 1.2 1 2 2.1 2.6C10.6 8 11 5.3 12 3Z"/>`,
  },
  power: {
    cat: 'edu',
    glyph: `<path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/>`,
  },

  // ================= 图片处理 img =================
  qrcode: {
    cat: 'img',
    glyph: `<rect x="4" y="4" width="6.5" height="6.5" rx="1"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1"/>${dot(7.25, 7.25)}${dot(16.75, 7.25)}${dot(7.25, 16.75)}${dot(14.5, 14.5)}${dot(18.5, 14.5)}${dot(14.5, 18.5)}${dot(18.5, 18.5)}`,
  },
  signimage: {
    cat: 'img',
    glyph: `<rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M4.5 17l5-5 3.5 3.5 2.5-2.5 4 4"/>`,
  },
  texttoimg: {
    cat: 'img',
    glyph: `<path d="M5 5.5h14"/><path d="M5 9.5h14"/><path d="M5 13.5h7"/><rect x="13" y="12.5" width="7" height="7" rx="1.2"/><path d="M13.8 18l1.7-1.7 1.3 1.3 1-1 1.4 1.4"/>`,
  },
  imgcut: {
    cat: 'img',
    glyph: `<rect x="4" y="4" width="16" height="16" rx="1.5"/><path d="M4 9.33h16"/><path d="M4 14.67h16"/><path d="M9.33 4v16"/><path d="M14.67 4v16"/>`,
  },
  imagecolorpicker: {
    cat: 'img',
    glyph: `<path d="M16.5 3.5l4 4L11 17H8v-3l8.5-8.5z"/><path d="M14 6l4 4"/><path d="M6.5 18.5c.8 1 1.3 1.7 1.3 2.4a1.3 1.3 0 1 1-2.6 0c0-.7.5-1.4 1.3-2.4Z"/>`,
  },
  imagewatermark: {
    cat: 'img',
    glyph: `<rect x="3.5" y="4.5" width="13" height="13" rx="1.8"/><circle cx="7.5" cy="8.5" r="1.2"/><path d="M17.5 13.2c1.5 1.9 2.4 3.1 2.4 4.3a2.4 2.4 0 1 1-4.8 0c0-1.2.9-2.4 2.4-4.3Z"/>`,
  },

  // ================= 数据图表 chart =================
  bar: {
    cat: 'chart',
    glyph: `<path d="M4 4v16h16"/><path d="M8.5 20v-6"/><path d="M13 20v-9.5"/><path d="M17.5 20v-7.5"/>`,
  },
  line: {
    cat: 'chart',
    glyph: `<path d="M4 4v16h16"/><path d="M7 15.5l4-5 3 3 4-6.5"/>`,
  },
  pie: {
    cat: 'chart',
    glyph: `<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5V12l6.5 5.5"/>`,
  },
  scatter: {
    cat: 'chart',
    glyph: `<path d="M4 4v16h16"/>${dot(9, 14, 1.3)}${dot(12, 9, 1.3)}${dot(15, 13.5, 1.3)}${dot(17.5, 7, 1.3)}`,
  },
  wordcloud: {
    cat: 'chart',
    glyph: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>`,
  },

  // ================= 选择随机 rand =================
  random: {
    cat: 'rand',
    glyph: `<path d="M16 3h5v5"/><path d="M4 20 21 3"/><path d="M21 16v5h-5"/><path d="m15 15 6 6"/><path d="M4 4l5 5"/>`,
  },
  decision: {
    cat: 'rand',
    glyph: `<circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.2a2.5 2.5 0 0 1 4.9.6c0 1.6-2.4 2-2.4 3.4"/>${dot(12, 16.8)}`,
  },
  coin: {
    cat: 'rand',
    glyph: `<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/>`,
  },
  dice: {
    cat: 'rand',
    glyph: `<rect x="4.5" y="4.5" width="15" height="15" rx="3.5"/>${dot(8.7, 8.7, 1.2)}${dot(15.3, 8.7, 1.2)}${dot(12, 12, 1.2)}${dot(8.7, 15.3, 1.2)}${dot(15.3, 15.3, 1.2)}`,
  },
  lottery: {
    cat: 'rand',
    glyph: `<path d="M9.5 10.5 8 4.5"/><path d="M12 10.5V3.5"/><path d="M14.5 10.5 16 4.5"/><path d="M7 10.5h10l-1.1 9a2 2 0 0 1-2 1.5h-3.8a2 2 0 0 1-2-1.5Z"/>`,
  },
  wheel: {
    cat: 'rand',
    glyph: `<circle cx="12" cy="13" r="7.5"/><circle cx="12" cy="13" r="1.6"/><path d="M12 5.5v5.9"/><path d="M12 14.6v5.9"/><path d="M4.5 13h5.9"/><path d="M13.6 13h5.9"/><path d="M10.5 3.2h3L12 5.8Z" fill="FILL" stroke="none"/>`,
  },

  // ================= 其他工具 misc =================
  numbertochinese: {
    cat: 'misc',
    glyph: `<circle cx="12" cy="12" r="8.5"/><path d="M8 6.8l4 4.8 4-4.8"/><path d="M12 11.6v5.9"/><path d="M9 13.6h6"/><path d="M9 16h6"/>`,
  },
  barrage: {
    cat: 'misc',
    glyph: `<rect x="3.5" y="5" width="17" height="12" rx="2"/><path d="M6.5 9h6"/><path d="M6.5 13h9"/><path d="M12 17v3"/><path d="M8.5 20h7"/>`,
  },
  colorpalette: {
    cat: 'misc',
    glyph: `<path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.5 0 2.1-1 1.6-2.2-.6-1.4.3-2.8 1.9-2.8h1.6a3.4 3.4 0 0 0 3.4-3.4c0-4.7-3.9-8.6-8.5-8.6Z"/>${dot(7.6, 9.6)}${dot(11, 7.2)}${dot(14.6, 8.4)}`,
  },
  colorpicker: {
    cat: 'misc',
    glyph: `<path d="M12 2 2 7l10 5 10-5L12 2z"/><path d="m2 12 10 5 10-5"/><path d="m2 17 10 5 10-5"/>`,
  },
  pomodoro: {
    cat: 'misc',
    glyph: `<circle cx="12" cy="14" r="7"/><path d="M12 14V9.5"/><path d="M12 4v3"/><path d="M9.5 4h5"/>`,
  },
  reactiontest: {
    cat: 'misc',
    glyph: `<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5"/>${dot(12, 12, 1.6)}`,
  },
  m3u8player: {
    cat: 'misc',
    glyph: `<circle cx="12" cy="12" r="8.5"/><path d="M10.5 8.8 16 12l-5.5 3.2Z"/>`,
  },
  rockpaperscissors: {
    cat: 'misc',
    glyph: `<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9"/><path d="M14.5 14.5 20 20"/><path d="M8.1 8.1 12 12"/>`,
  },
  emoji: {
    cat: 'misc',
    glyph: `<circle cx="12" cy="12" r="8.5"/>${dot(9.2, 10)}${dot(14.8, 10)}<path d="M8.5 13.8a5 5 0 0 0 7 0"/>`,
  },
  calculator: {
    cat: 'misc',
    glyph: `<rect x="6" y="3.5" width="12" height="17" rx="2"/><path d="M9 7.5h6"/>${dot(9.3, 12)}${dot(12, 12)}${dot(14.7, 12)}${dot(9.3, 15.5)}${dot(12, 15.5)}${dot(14.7, 15.5)}`,
  },
}

function renderSvg(cat, glyph) {
  const { bg, fg } = CATS[cat]
  const inner = glyph.replaceAll('FILL', fg)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="${bg}"/><g transform="translate(12 12)" fill="none" stroke="${fg}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</g></svg>\n`
}

mkdirSync(OUT_DIR, { recursive: true })

let count = 0
for (const [name, def] of Object.entries(ICONS)) {
  const file = join(OUT_DIR, `${name}.svg`)
  writeFileSync(file, renderSvg(def.cat, def.glyph), 'utf8')
  count++
}
console.log(`Generated ${count} icons -> ${OUT_DIR}`)
