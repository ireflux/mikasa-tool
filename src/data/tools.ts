import type { ToolsReqData, ToolsInfo } from './tools.type'

//获取tools分类与对应的工具
export function getToolCategories() {
  const base = import.meta.env.BASE_URL
  const categories = [
    {
      id: 2,
      title: '开发运维',
      icon: '',
      list: [
        {
          title: '随机密码生成',
          logo: '/images/logo/randompassword.svg',
          desc: '密码生成器、随机字符串生成,批量生成',
          url: '/randompassword/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          title: 'URL编码/解码',
          logo: '/images/logo/urlencode.svg',
          desc: 'URL在线编码解码工具（UrlEncode编码 和 UrlDecode解码）',
          url: '/urlencode/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          title: 'UUID生成器',
          logo: '/images/logo/uuid.svg',
          desc: '批量生成UUID',
          url: '/uuid/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          title: '时间戳转换',
          logo: '/images/logo/timetran.svg',
          desc: '在线时间戳转换工具以及获取当前时间戳',
          url: '/timetran/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          title: 'MD5在线加密',
          logo: '/images/logo/md5.svg',
          desc: 'MD5在线加密,长度包含32位、16位',
          url: '/md5/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          title: 'Json在线转换',
          logo: '/images/logo/json.svg',
          desc: '提供实时编辑和预览JSON 数据，语法高亮、校验、格式化、转义，去转义、压缩等功能，可以提高阅读修改的效率和准确性',
          url: '/json/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          title: '正则测试工具',
          logo: '/images/logo/reg.svg',
          desc: '正则表达式测试工具, 常用正则表达式',
          url: '/reg/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          title: 'Unicode转中文',
          logo: '/images/logo/unicode.svg',
          desc: 'Unicode和中文的相互转换',
          url: '/unicode/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          title: 'HTTP状态码',
          logo: '/images/logo/httpstatuscode.svg',
          desc: 'http状态对应的名称和含义解释',
          url: '/httpstatuscode/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          title: 'JWT解析',
          logo: '/images/logo/jwt.svg',
          desc: '解析和解码JSON Web Token（jwt）',
          url: '/jwt/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          title: 'html实体转义',
          logo: '/images/logo/htmlentity.svg',
          desc: 'html实体转义，实体转义成html',
          url: '/htmlentity/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          title: 'js代码格式化/压缩',
          logo: '/images/logo/jsformat.svg',
          desc: 'JS格式化/压缩工具,提供在线JS格式化、JS压缩、JS混淆、JS解密',
          url: '/jsformat/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          title: 'Html代码格式化',
          logo: '/images/logo/htmlformat.svg',
          desc: '提供在线html、xml格式化',
          url: '/htmlformat/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          title: 'Css代码格式化/压缩',
          logo: '/images/logo/cssformat.svg',
          desc: 'css格式化/压缩工具,提供在线css格式化、css压缩',
          url: '/cssformat/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          title: 'Base64加解密',
          logo: '/images/logo/Base64.svg',
          desc: '在线Base64加解密工具，支持文本的Base64编码和解码',
          url: '/base64/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          title: '进制转换计算器',
          logo: '/images/logo/baseconverter.svg',
          desc: '在线进制转换计算器，支持二进制、八进制、十进制、十六进制等多种进制之间的相互转换',
          url: '/baseconverter/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          title: '数据存储单位换算',
          logo: '/images/logo/storageconverter.svg',
          desc: '在线数据存储单位换算工具，支持字节、KB、MB、GB、TB、PB、EB等存储单位之间的相互转换',
          url: '/storageconverter/',
          cateId: 2,
          cate: '开发运维',
        },

        {
          title: 'Hash计算器',
          logo: '/images/logo/hashcalculator.svg',
          desc: '在线Hash计算器，支持MD5、SHA-1、SHA-256、SHA-384、SHA-512等多种哈希算法',
          url: '/hashcalculator/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          title: 'XML格式化',
          logo: '/images/logo/xmlformat.svg',
          desc: '在线XML格式化工具，用于美化和压缩XML代码，支持自定义缩进大小',
          url: '/xmlformat/',
          cateId: 2,
          cate: '开发运维',
        },
        {
          title: 'SQL格式化',
          logo: '/images/logo/sqlformat.svg',
          desc: '在线SQL格式化工具，用于美化和压缩SQL代码，支持自定义缩进大小',
          url: '/sqlformat/',
          cateId: 2,
          cate: '开发运维'
        }
      ]
    },
    {
      id: 3,
      title: '文本处理',
      icon: '',
      list: [
        {
          title: '文本对比',
          logo: '/images/logo/diff.svg',
          desc: '文本差异比对支持中文、英文、代码比对',
          url: '/diff/',
          cateId: 3,
          cate: '文本处理'
        },
        {
          title: 'markdown编辑器',
          logo: '/images/logo/markdown.svg',
          desc: '在线创建或编辑markdown, 实时预览，导出markdown',
          url: '/markdown/',
          cateId: 3,
          cate: '文本处理'
        },
        {
          title: '字数统计',
          logo: '/images/logo/wordcount.svg',
          desc: '在线统计字符串的字数、段落、标点符号数量',
          url: '/wordcount/',
          cateId: 3,
          cate: '文本处理',
        },
        {
          title: '文本去重',
          logo: '/images/logo/textremoveduplicate.svg',
          desc: '可以删除或去除文本或字符串中的重复行',
          url: '/textremoveduplicate/',
          cateId: 3,
          cate: '文本处理',
        },
        {
          title: 'ASCII字形生成器',
          logo: '/images/logo/asciiwordpic.svg',
          desc: '在线生成字形ASCII画',
          url: '/asciiwordpic/',
          cateId: 3,
          cate: '文本处理',
        },
        {
          title: '在线文本编辑/HTML获取',
          logo: '/images/logo/textedit.svg',
          desc: '在线富文本编辑, html实时预览，在线编辑文本，文本编辑获取html',
          url: '/textedit/',
          cateId: 3,
          cate: '文本处理'
        },
        {
          title: '文本替换',
          logo: '/images/logo/textreplace.svg',
          desc: '在线文本替换工具，支持普通文本和正则表达式替换，可用于批量修改文本内容',
          url: '/textreplace/',
          cateId: 3,
          cate: '文本处理',
        },
        {
          title: '文本处理工作流',
          logo: '/images/logo/textworkflow.svg',
          desc: '在线文本处理工作流工具，允许用户定义一系列文本处理步骤并按顺序执行',
          url: '/textworkflow/',
          cateId: 3,
          cate: '文本处理',
        },
        {
          title: '词频统计',
          logo: '/images/logo/wordfrequency.svg',
          desc: '在线词频统计工具，用于统计文本中单词出现的频率，可用于文本分析、关键词提取等场景',
          url: '/wordfrequency/',
          cateId: 3,
          cate: '文本处理',
        },
      ]
    },
    {
      id: 4,
      title: '教育学术',
      icon: '',
      list: [
        {
          title: '单位换算',
          logo: '/images/logo/unit.svg',
          desc: '在线重量、长度、面积、时间、角度、速度、温度、压力、热量、功率等换算',
          url: '/unit/',
          cateId: 4,
          cate: '教育学术'
        },
        {
          title: '摩斯电码',
          logo: '/images/logo/morse.svg',
          desc: '支持中文的摩斯电码编码解码',
          url: '/morse/',
          cateId: 4,
          cate: '教育学术'
        },
        {
          title: '常用进制转换',
          logo: '/images/logo/scaletran.svg',
          desc: '在线进制转换工具,可在2到64进制之间相互转换',
          url: '/scaletran/',
          cateId: 4,
          cate: '教育学术',
        },
        {
          title: 'ASCII码表',
          logo: '/images/logo/ascii.svg',
          desc: 'ASCII码表,控制代码、标准ASCII字符和非标准ASCII字符对照表',
          url: '/ascii/',
          cateId: 4,
          cate: '教育学术'
        },
        {
          title: '长度单位转换',
          logo: '/images/logo/length.svg',
          desc: '长度转换工具-支持国际长度单位，中国传统长度单位，英制长度单位',
          url: '/unit/?active=length',
          cateId: 4,
          cate: '教育学术'
        },
        {
          title: '面积单位转换',
          logo: '/images/logo/area.svg',
          desc: '面积转换工具-支持国际面积单位，中国传统面积单位，英制面积单位',
          url: '/unit/?active=area',
          cateId: 4,
          cate: '教育学术'
        },
        {
          title: '重量单位转换',
          logo: '/images/logo/weight.svg',
          desc: '重量转换工具-支持国际重量单位，中国传统重量单位，英制重量单位(常衡制和金衡制)',
          url: '/unit/?active=weight',
          cateId: 4,
          cate: '教育学术'
        },
        {
          title: '时间单位转换',
          logo: '/images/logo/time.svg',
          desc: '时间单位转换工具-支持国际时间单位',
          url: '/unit/?active=time',
          cateId: 4,
          cate: '教育学术'
        },
        {
          title: '温度单位转换',
          logo: '/images/logo/temperature.svg',
          desc: '温度单位转换工具-支持国际温度单位',
          url: '/unit/?active=temperature',
          cateId: 4,
          cate: '教育学术'
        },
        {
          title: '压力单位转换',
          logo: '/images/logo/pressure.svg',
          desc: '压力单位转换工具-Pa/kPa/hPa/MPa/bar/torr/psi等',
          url: '/unit/?active=pressure',
          cateId: 4,
          cate: '教育学术'
        },
        {
          title: '热量单位转换',
          logo: '/images/logo/heat.svg',
          desc: '热量单位转换工具-Wh/mWh/kWh/MWh/J/kJ等',
          url: '/unit/?active=heat',
          cateId: 4,
          cate: '教育学术'
        },
        {
          title: '功率单位转换',
          logo: '/images/logo/power.svg',
          desc: '功率单位转换工具-W/mW/kW/MW/GW等',
          url: '/unit/?active=power',
          cateId: 4,
          cate: '教育学术'
        },
      ]
    },
    {
      id: 5,
      title: '图片处理',
      icon: '',
      list: [
        {
          title: '二维码生成',
          logo: '/images/logo/qrcode.svg',
          desc: '在线生成带logo、透明、艺术的二维码',
          url: '/qrcode/',
          cateId: 5,
          cate: '图片处理'
        },
        {
          title: '在线图片处理',
          logo: '/images/logo/signimage.svg',
          desc: '在线图片裁剪，图片标注，图片滤镜，图片画笔、图片旋转、图片文字等操作',
          url: '/signimage/',
          cateId: 5,
          cate: '图片处理',
        },
        {
          title: '文本转图片',
          logo: '/images/logo/texttoimg.svg',
          desc: '把文本转换成图片，生成长图，具有超多个性文字排版',
          url: '/texttoimg/',
          cateId: 5,
          cate: '图片处理'
        },
        {
          title: '图片分割',
          logo: '/images/logo/imgcut.svg',
          desc: '将图片分割成四宫格、九宫格、十六宫格，支持自定义行与列',
          url: '/imgcut/',
          cateId: 5,
          cate: '图片处理',
        },
        {
          title: '传图取色',
          logo: '/images/logo/imagecolorpicker.svg',
          desc: '上传图片并点击图片获取颜色值',
          url: '/imagecolorpicker/',
          cateId: 5,
          cate: '图片处理',
        },
        {
          title: '图片水印添加',
          logo: '/images/logo/imagewatermark.svg',
          desc: '上传图片并添加文字水印',
          url: '/imagewatermark/',
          cateId: 5,
          cate: '图片处理',
        }
      ]
    },
    {
      id: 8,
      title: '数据图表',
      icon: '',
      list: [
        {
          title: '柱状图',
          logo: '/images/logo/bar.svg',
          desc: '在线制作柱状图，像做表格一样制作可视化图表，支持导出静态或动态图表',
          url: '/bar/',
          cateId: 8,
          cate: '数据图表',
        },{
          title: '折线图',
          logo: '/images/logo/line.svg',
          desc: '在线制作折线图，像做表格一样制作可视化图表，支持导出静态或动态图表',
          url: '/line/',
          cateId: 8,
          cate: '数据图表',
        },
        {
          title: '饼图',
          logo: '/images/logo/pie.svg',
          desc: '在线制作饼图，像做表格一样制作可视化图表，支持导出静态或动态图表',
          url: '/pie/',
          cateId: 8,
          cate: '数据图表',
        },
        {
          title: '散点图',
          logo: '/images/logo/scatter.svg',
          desc: '在线制作散点图，像做表格一样制作可视化图表，支持导出静态或动态图表',
          url: '/scatter/',
          cateId: 8,
          cate: '数据图表',
        },
        {
          title: '词云生成',
          logo: '/images/logo/wordcloud.svg',
          desc: '根据输入文本生成词云图，支持自定义词云形状和颜色',
          url: '/wordcloud/',
          cateId: 8,
          cate: '数据图表',
        },
      ]
    },
    {
      id: 9,
      title: '选择随机',
      icon: '',
      list: [
        {
          title: '生成随机数',
          logo: '/images/logo/random.svg',
          desc: '可定制范围内进行随机数字，可用于抽奖、点名等用途',
          url: '/random/',
          cateId: 9,
          cate: '选择随机'
        },
        {
          title: '帮我决定',
          logo: '/images/logo/decision.svg',
          desc: '选择困难，难以决定，今天吃什么，现在做什么，自定义选项都给你安排的明明白白',
          url: '/decision/',
          cateId: 9,
          cate: '选择随机'
        },
        {
          title: '抛硬币',
          logo: '/images/logo/coin.svg',
          desc: '在线抛硬币，选择困难那么交给硬币来帮你选择吧',
          url: '/coin/',
          cateId: 9,
          cate: '选择随机',
        },
        {
          title: '投骰子',
          logo: '/images/logo/dice.svg',
          desc: '在线投骰子，可自定义骰子数量，简单好用的骰子工具',
          url: '/dice/',
          cateId: 9,
          cate: '选择随机',
        },
        {
          title: '抽签工具',
          logo: '/images/logo/lottery.svg',
          desc: '输入多个选项，随机抽取一个或多个结果',
          url: '/lottery/',
          cateId: 9,
          cate: '选择随机',
        },
        {
          title: '转盘工具',
          logo: '/images/logo/wheel.svg',
          desc: '自定义选项，旋转转盘随机选择结果',
          url: '/wheel/',
          cateId: 9,
          cate: '选择随机',
        },
      ]
    },
    // {
    //   id: 6,
    //   title: '查询相关',
    //   icon: '',
    //   list: [
    //     {
    //       id: 1,
    //       title: 'IP查询',
    //       logo: '/images/logo/IP.png',
    //       desc: '在线查询ip地址、ip归属地',
    //       url: '/ip',
    //       cateId: 6,
    //       cate: '查询相关',
    //     },
    //     {
    //       id: 1,
    //       title: '网站favicon获取',
    //       logo: '/images/logo/text_to_img.png',
    //       desc: '获取网站logo、icon、favicon、标题、关键词、描述等信息',
    //       url: '/webInfo',
    //       cateId: 6,
    //       cate: '查询相关',
    //     }
    //   ]
    // },
    {
      id: 7,
      title: '其他工具',
      icon: '',
      list: [
        {
          title: '数字转金额大写',
          logo: '/images/logo/numbertochinese.svg',
          desc: '在线数字一键转换成人民币大写，中文大写转换数字',
          url: '/numbertochinese/',
          cateId: 7,
          cate: '其他工具'
        },
        {
          title: '手持弹幕',
          logo: '/images/logo/barrage.svg',
          desc: '手持滚动弹幕',
          url: '/barrage/',
          cateId: 7,
          cate: '其他工具',
        },
        {
          title: '色板',
          logo: '/images/logo/colorpalette.svg',
          desc: '提供各种颜色的色板，点击颜色可复制颜色值',
          url: '/colorpalette/',
          cateId: 7,
          cate: '其他工具',
        },
        {
          title: 'Color选择器',
          logo: '/images/logo/colorpicker.svg',
          desc: '颜色选择器、在各种颜色空间如十六进制、rgb、hsl、css等等之间转换颜色',
          url: '/colorpicker/',
          cateId: 7,
          cate: '其他工具'
        },
        {
          title: '番茄时钟',
          logo: '/images/logo/pomodoro.svg',
          desc: '专注工作和休息的时间管理工具',
          url: '/pomodoro/',
          cateId: 7,
          cate: '其他工具',
        },
        {
          title: '反应速度测试',
          logo: '/images/logo/reactiontest.svg',
          desc: '测试你的反应速度，点击变色的方块',
          url: '/reactiontest/',
          cateId: 7,
          cate: '其他工具',
        },
        {
          title: 'm3u8在线播放',
          logo: '/images/logo/m3u8player.svg',
          desc: '播放m3u8格式的视频流',
          url: '/m3u8player/',
          cateId: 7,
          cate: '其他工具',
        },
        {
          title: '剪刀石头布',
          logo: '/images/logo/rockpaperscissors.svg',
          desc: '与电脑对战的剪刀石头布游戏',
          url: '/rockpaperscissors/',
          cateId: 7,
          cate: '其他工具',
        },
        {
          title: 'Emoji表情大全',
          logo: '/images/logo/emoji.svg',
          desc: '在线Emoji表情大全，提供各种分类的Emoji表情，点击即可复制到剪贴板',
          url: '/emoji/',
          cateId: 7,
          cate: '其他工具',
        },
        {
          title: '简易计算器',
          logo: '/images/logo/calculator.svg',
          desc: '基本的加减乘除计算工具',
          url: '/calculator/',
          cateId: 7,
          cate: '其他工具',
        },
      ]
    }
  ]
  for (const cate of categories) {
    for (const tool of cate.list) {
      if (tool.logo && tool.logo.startsWith('/')) {
        tool.logo = base + tool.logo.slice(1)
      }
    }
  }
  return categories
}

//工具list
export function toolsList(): ToolsInfo[] {
  let list = [] as ToolsInfo[]
  let toolsCate = getToolCategories()
  for (const item of toolsCate) {
    for (const _item of item.list) {
      list.push(_item)
    }
  }
  return list
}

//获取工具
export function searchTools(data: ToolsReqData) {
  //接收参数
  const { cateId, title, route } = data
  //获取工具list
  let list = toolsList()
  //标题筛选
  if (title != '') {
    list = list.filter(item => {
      let tmpValue = item.title.toLowerCase()
      let tmpDesc = item.desc.toLowerCase()
      return tmpValue.indexOf(title.toLowerCase()) !== -1 || tmpDesc.indexOf(title.toLowerCase()) !== -1;
    });
  }
  //分类筛选
  if (cateId > 0) {
    list = list.filter(item => {
      return item.cateId === cateId;  
    });
  }
  //路由筛选
  if (route) {
    list = list.filter(item => {
      // 移除末尾的斜杠后比较
      const itemUrl = item.url.replace(/\/$/, '');
      const routeUrl = route.replace(/\/$/, '');
      return itemUrl === routeUrl;
    });
  }
  return list
}
