import type { RouteRecordRaw } from 'vue-router'

// 生活娱乐
export const lifeRoutes: RouteRecordRaw[] = [
  {
    path: '/barrage',
    component: () => import('@/components/Tools/Barrage/Barrage.vue'),
    name: 'barrage',
    meta: {
      title: "手持弹幕",
      keywords: '手持弹幕,弹幕工具',
      description: '手持弹幕是一种新型的互动沟通工具，可以方便地为各种户外活动、演出嘉年华等活动增加趣味性和互动性。手持弹幕具有轻便、易携带、易操作等优点，可以让每个参与者都变成活动的一部分。同时，手持弹幕还可以通过预先编写的文本、表情等形式，表达参与者的情感和想法，实现沟通互动。在社交媒体时代，手持弹幕的使用也带来了更广泛的社交效应，增加了活动的互动性和传播度。无论是举办方还是参与者，手持弹幕都是一个非常有价值的互动工具。',
    }
  },
  {
    path: '/decision',
    component: () => import('@/components/Tools/Decision/Decision.vue'),
    name: 'decision',
    meta: {
      title: "帮我决定",
      keywords: '选择困难,难以决定,今天吃什么,现在做什么,自定义选项都给你安排的明明白白',
      description: '选择困难症，自定义选择内容',
    }
  },
  {
    path: '/random',
    component: () => import('@/components/Tools/Random/Random.vue'),
    name: 'random',
    meta: {
      title: "生成随机数",
      keywords: '随机数生成,随机数',
      description: '可定制范围内进行随机数字，可用于抽奖、点名等用途',
    }
  },
  {
    path: '/numbertochinese',
    component: () => import('@/components/Tools/NumberToChinese/NumberToChinese.vue'),
    name: 'numberToChinese',
    meta: {
      title: "数字转金额大写",
      keywords: '数字转中文,数字转大写,中文转数字,大写转数字,数字中文互转',
      description: '在线数字一键转换成人民币大写，中文大写金额数字应用正楷或行书填写',
    }
  },
  {
    path: '/coin',
    component: () => import('@/components/Tools/Coin/Coin.vue'),
    name: 'coin',
    meta: {
      title: "抛硬币",
      keywords: '抛硬币,硬币',
      description: '在线抛硬币，选择困难那么交给硬币来帮你选择吧',
    }
  },
  {
    path: '/dice',
    component: () => import('@/components/Tools/Dice/Dice.vue'),
    name: 'dice',
    meta: {
      title: "投骰子",
      keywords: '投骰子,骰子,自定义骰子',
      description: '在线投骰子，可自定义骰子数量，简单好用的骰子工具',
    }
  },
  {
    path: '/emoji',
    component: () => import('@/components/Tools/Emoji/Emoji.vue'),
    name: 'emoji',
    meta: {
      title: "Emoji表情大全",
      keywords: 'Emoji,表情符号,表情大全',
      description: '在线Emoji表情大全，提供各种分类的Emoji表情，点击即可复制到剪贴板',
    }
  },
  {
    path: '/lottery',
    component: () => import('@/components/Tools/Lottery/Lottery.vue'),
    name: 'lottery',
    meta: {
      title: "抽签工具",
      keywords: '抽签,随机选择,抽奖',
      description: '输入多个选项，随机抽取一个或多个结果',
    }
  },
  {
    path: '/rockpaperscissors',
    component: () => import('@/components/Tools/RockPaperScissors/RockPaperScissors.vue'),
    name: 'rockpaperscissors',
    meta: {
      title: "剪刀石头布",
      keywords: '剪刀石头布,游戏,对战',
      description: '与电脑对战的剪刀石头布游戏',
    }
  },
  {
    path: '/wheel',
    component: () => import('@/components/Tools/Wheel/Wheel.vue'),
    name: 'wheel',
    meta: {
      title: "转盘工具",
      keywords: '转盘,随机选择,抽奖',
      description: '自定义选项，旋转转盘随机选择结果',
    }
  },
  {
    path: '/pomodoro',
    component: () => import('@/components/Tools/Pomodoro/Pomodoro.vue'),
    name: 'pomodoro',
    meta: {
      title: "番茄时钟",
      keywords: '番茄工作法,时间管理,专注',
      description: '专注工作和休息的时间管理工具',
    }
  },
  {
    path: '/calculator',
    component: () => import('@/components/Tools/Calculator/Calculator.vue'),
    name: 'calculator',
    meta: {
      title: "简易计算器",
      keywords: '计算器,加减乘除,数学计算',
      description: '基本的加减乘除计算工具',
    }
  },
  {
    path: '/reactiontest',
    component: () => import('@/components/Tools/ReactionTest/ReactionTest.vue'),
    name: 'reactiontest',
    meta: {
      title: "反应速度测试",
      keywords: '反应速度,测试,游戏',
      description: '测试你的反应速度，点击变色的方块',
    }
  },
]
