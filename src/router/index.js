import Vue from 'vue'
import Router from 'vue-router'



// 首页
import pcIndex from '@/view/index/PC/pcIndex'//PC端首页
import pcListDetail from '@/view/index/PC/pcListDetail'//PC端商品详细页
import index from '@/view/index/index'//移动端首页
import qiandao from '@/view/index/qiandao/qiandao' //签到
import yundong from '@/view/index/yundong/yundong' //运动
import bianqian from '@/view/index/bianqian/bianqian' //便签
import dushu from '@/view/index/dushu/dushu' //读书
import changge from '@/view/index/changge/changge' //唱歌
import xuexi from '@/view/index/xuexi/xuexi' //学习
import zhishi from '@/view/index/xuexi/zhishi' //知识累计
import zsTest from '@/view/index/xuexi/zsTest' //知识累计子页面
import dati from '@/view/index/xuexi/dati' //答题
import dtTest from '@/view/index/xuexi/dtTest' //答题子页面
import kaoshi from '@/view/index/xuexi/kaoshi' //考试
import ksTest from '@/view/index/xuexi/ksTest' //考试子页面

// 新闻
import news from '@/view/news/news'
import newsmain from '@/view/news/newsmain/newsmain' //新闻内容页

// 音乐
import music from '@/view/music/music'
import meiritj from '@/view/music/meiritj/meiritj' //每日推荐
import gedan from '@/view/music/gedan/gedan' //歌单
import paihb from '@/view/music/paihb/paihb' //排行榜
import diantai from '@/view/music/diantai/diantai' //电台
import paobu from '@/view/music/paobu/paobu' //跑步

// 视频
import video from '@/view/video/video'
import videomain from '@/view/video/videomain/videomain' //视频内容页

// 购物
import shop from '@/view/shop/shop'
import shopmain from '@/view/shop/shopmain'//商品详细页
import shopchildren from '@/view/shop/shopchildren'//商品详细页

// 我的
import home from '@/view/home/home'
import myshoucang from '@/view/home/myshoucang/myshoucang' //我的收藏
import test1 from '@/view/home/myshoucang/test/test1' //测试功能页面1
import test2 from '@/view/home/myshoucang/test/test2' //测试功能页面2
import test3 from '@/view/home/myshoucang/test/test3' //测试功能页面3
import test4 from '@/view/home/myshoucang/test/test4' //测试功能页面4
import search4 from '@/view/home/myshoucang/test/search4' //测试功能页面4子页面

import mypinglun from '@/view/home/mypinglun/mypinglun' //我的评论
import mydianzan from '@/view/home/mydianzan/mydianzan' //我的点赞
import mylishi from '@/view/home/mylishi/mylishi' //浏览历史

import myqianbao from '@/view/home/myqianbao/myqianbao' //我的钱包

import myxiaoxi from '@/view/home/myxiaoxi/myxiaoxi' //消息通知
import myxiaoximain from '@/view/home/myxiaoxi/myxiaoximain' //消息通知详细内容

import mysixin from '@/view/home/mysixin/mysixin' //我的私信
import mysixinmain from '@/view/home/mysixin/mysixinmain' //我的私信详细内容

import myzuopin from '@/view/home/myzuopin/myzuopin' //作品管理
import myshujia from '@/view/home/myshujia/myshujia' //我的书架
import mydingdan from '@/view/home/mydingdan/mydingdan' //我的订单
import mysaoma from '@/view/home/mysaoma/mysaoma' //扫一扫
import myfankui from '@/view/home/myfankui/myfankui' //用户反馈

import myshezhi from '@/view/home/myshezhi/myshezhi' //系统设置
import about from '@/view/home/myshezhi/about' //关于我们
import updatelog from '@/view/home/myshezhi/updatelog' //关于我们

// 登录
import login from '@/view/login/login' //登录
import sign from '@/view/login/sign' //注册

Vue.use(Router)

export default new Router({
  mode: 'history', // 去除初始进入路由后面的#
  routes: [{
    path: '/',
    redirect: '/index', // 初始路由'/'重定向至'/index'
  }, {
    path: '/index',
    name: '首页',
    // component: index,
    component: resolve => require(['../view/index/index.vue'],resolve)  //懒加载
  }, {
    path: '/pcIndex',
    name: 'PC端首页',
    // component: pcIndex,
    component: resolve => require(['../view/index/PC/pcIndex.vue'],resolve)
  }, {
    path: '/pcListDetail',
    name: 'PC端商品详细页',
    // component: pcListDetail,
    component: resolve => require(['../view/index/PC/pcListDetail.vue'],resolve)
  }, {
    path: '/index/qiandao',
    name: '签到',
    meta: {
      requireAuth: true,  //添加该字段，表示进入这个路由需要登录
    },
    // component: qiandao,
    component: resolve => require(['../view/index/qiandao/qiandao.vue'],resolve)
  }, {
    path: '/index/yundong',
    name: '运动',
    // component: yundong,
    component: resolve => require(['../view/index/yundong/yundong.vue'],resolve)
  }, , {
    path: '/index/bianqian',
    name: '便签',
    // component: bianqian,
    component: resolve => require(['../view/index/bianqian/bianqian.vue'],resolve)
  }, {
    path: '/index/dushu',
    name: '读书',
    // component: dushu,
    component: resolve => require(['../view/index/dushu/dushu.vue'],resolve)
  }, {
    path: '/index/changge',
    name: '唱歌',
    // component: changge,
    component: resolve => require(['../view/index/changge/changge.vue'],resolve)
  }, {
    path: '/index/xuexi',
    name: '学习',
    // component: xuexi,
    component: resolve => require(['../view/index/xuexi/xuexi.vue'],resolve)
  }, {
    path: '/index/xuexi/zhishi',
    name: '知识累计',
    meta: {
      requireAuth: true,  //添加该字段，表示进入这个路由需要登录
    },
    // 懒加载
    component: resolve => require(['../view/index/xuexi/zhishi.vue'],resolve),
    children: [ //子路由
      { path:'/index/xuexi/zhishi/zsTest', component:zsTest, name:'知识累计子页面' },
    ]
  },{
    path: '/index/xuexi/dati',
    name: '答题比赛',
    meta: {
      requireAuth: true,  //添加该字段，表示进入这个路由需要登录
    },
    // component: xuexi,
    component: resolve => require(['../view/index/xuexi/dati.vue'],resolve),
    children: [ //子路由
      { path:'/index/xuexi/dati/dtTest', component:dtTest, name:'答题试题' },
    ]
  },{
    path: '/index/xuexi/kaoshi',
    name: '考试系统',
    meta: {
      requireAuth: true,  //添加该字段，表示进入这个路由需要登录
    },
    // component: xuexi,
    component: resolve => require(['../view/index/xuexi/kaoshi.vue'],resolve),
    children: [ //子路由
      { path:'/index/xuexi/kaoshi/ksTest', component:ksTest, name:'考试试题' },
    ]
  }, {
    path: '/news',
    name: '新闻',
    // component: news,
    component: resolve => require(['../view/news/news.vue'],resolve)
  }, {
    path: '/news/newsmain',
    name: '新闻内容页',
    // component: newsmain,
    component: resolve => require(['../view/news/newsmain/newsmain.vue'],resolve)
  }, {
    path: '/music',
    name: '音乐',
    // component: music,
    component: resolve => require(['../view/music/music.vue'],resolve)
  }, {
    path: '/music/meiritj',
    name: '每日推荐',
    meta: {
      requireAuth: true,  //添加该字段，表示进入这个路由需要登录
    },
    // component: meiritj,
    component: resolve => require(['../view/music/meiritj/meiritj.vue'],resolve)
  }, {
    path: '/music/gedan',
    name: '歌单',
    // component: gedan,
    component: resolve => require(['../view/music/gedan/gedan.vue'],resolve)
  }, {
    path: '/music/paihb',
    name: '排行榜',
    // component: paihb,
    component: resolve => require(['../view/music/paihb/paihb.vue'],resolve)
  }, {
    path: '/music/diantai',
    name: '电台',
    // component: diantai,
    component: resolve => require(['../view/music/diantai/diantai.vue'],resolve)
  }, {
    path: '/music/paobu',
    name: '跑步',
    // component: paobu,
    component: resolve => require(['../view/music/paobu/paobu.vue'],resolve)
  }, {
    path: '/shop',
    name: '商品',
    component: resolve => require(['../view/shop/shop.vue'],resolve),
    // redirect: '/shop/shopchildren',//直接跳转子路由
    children: [ //子路由
      { path:'/shop/shopchildren', component:shopchildren, name:'商品导航子路由' },
    ]
  }, {
    path: '/shopmain',
    name: '商品详细页',
    component: resolve => require(['../view/shop/shopmain.vue'],resolve)
  }, {
    path: '/video',
    name: '视频',
    // component: video,
    component: resolve => require(['../view/video/video.vue'],resolve)
  }, {
    path: '/video/videomain',
    name: '视频内容页',
    // component: videomain,
    component: resolve => require(['../view/video/videomain/videomain.vue'],resolve)
  }, {
    path: '/home',
    name: '我的',
    // component: home,
    component: resolve => require(['../view/home/home.vue'],resolve)
  }, {
    path: '/home/myshoucang',
    name: '我的收藏',
    meta: {
      requireAuth: true,  //添加该字段，表示进入这个路由需要登录
    },
    component: resolve => require(['../view/home/myshoucang/myshoucang.vue'],resolve)
  }, {
    path: '/home/myshoucang/test1',
    name: '测试功能页面1',
    component: resolve => require(['../view/home/myshoucang/test/test1.vue'],resolve)
  },{
    path: '/home/myshoucang/test2',
    name: '测试功能页面2',
    component: resolve => require(['../view/home/myshoucang/test/test2.vue'],resolve)
  },{
    path: '/home/myshoucang/test3',
    name: '测试功能页面3',
    component: resolve => require(['../view/home/myshoucang/test/test3.vue'],resolve)
  },{
    path: '/home/myshoucang/test4',
    name: '测试功能页面4',
    component: resolve => require(['../view/home/myshoucang/test/test4.vue'],resolve),
    children: [ //子路由
      { path:'/home/myshoucang/test4/search4', component:search4, name:'搜索子页面' },
    ]
  }, {
    path: '/home/mypinglun',
    name: '我的评论',
    meta: {
      requireAuth: true,  //添加该字段，表示进入这个路由需要登录
    },
    // component: mypinglun,
    component: resolve => require(['../view/home/mypinglun/mypinglun.vue'],resolve)
  }, {
    path: '/home/mydianzan',
    name: '我的点赞',
    meta: {
      requireAuth: true,  //添加该字段，表示进入这个路由需要登录
    },
    // component: mydianzan,
    component: resolve => require(['../view/home/mydianzan/mydianzan.vue'],resolve)
  }, {
    path: '/home/mylishi',
    name: '浏览历史',
    meta: {
      requireAuth: true,  //添加该字段，表示进入这个路由需要登录
    },
    // component: mylishi,
    component: resolve => require(['../view/home/mylishi/mylishi.vue'],resolve)
  }, {
    path: '/home/myqianbao',
    name: '我的钱包',
    meta: {
      requireAuth: true,  //添加该字段，表示进入这个路由需要登录
    },
    // component: myqianbao,
    component: resolve => require(['../view/home/myqianbao/myqianbao.vue'],resolve)
  }, {
    path: '/home/myxiaoxi',
    name: '消息通知',
    meta: {
      requireAuth: true,  //添加该字段，表示进入这个路由需要登录
    },
    component: resolve => require(['../view/home/myxiaoxi/myxiaoxi.vue'],resolve)
  }, {
    path: '/home/myxiaoxi/myxiaoximain',
    name: '消息通知详细内容',
    meta: {
      requireAuth: true,  //添加该字段，表示进入这个路由需要登录
    },
    component: resolve => require(['../view/home/myxiaoxi/myxiaoximain.vue'],resolve)
  }, {
    path: '/home/mysixin',
    name: '我的私信',
    meta: {
      requireAuth: true,  //添加该字段，表示进入这个路由需要登录
    },
    // component: mysixin,
    component: resolve => require(['../view/home/mysixin/mysixin.vue'],resolve)
  }, {
    path: '/home/mysixin/mysixinmain',
    name: '我的私信详细内容',
    meta: {
      requireAuth: true,  //添加该字段，表示进入这个路由需要登录
    },
    component: resolve => require(['../view/home/mysixin/mysixinmain.vue'],resolve)
  }, {
    path: '/home/myzuopin',
    name: '作品管理',
    meta: {
      requireAuth: true,  //添加该字段，表示进入这个路由需要登录
    },
    // component: myzuopin,
    component: resolve => require(['../view/home/myzuopin/myzuopin.vue'],resolve)
  }, {
    path: '/home/myshujia',
    name: '我的书架',
    meta: {
      requireAuth: true,  //添加该字段，表示进入这个路由需要登录
    },
    // component: myshujia,
    component: resolve => require(['../view/home/myshujia/myshujia.vue'],resolve)
  }, {
    path: '/home/mydingdan',
    name: '我的订单',
    meta: {
      requireAuth: true,  //添加该字段，表示进入这个路由需要登录
    },
    // component: mydingdan,
    component: resolve => require(['../view/home/mydingdan/mydingdan.vue'],resolve)
  }, {
    path: '/home/mysaoma',
    name: '扫一扫',
    // component: mysaoma,
    component: resolve => require(['../view/home/mysaoma/mysaoma.vue'],resolve)
  }, {
    path: '/home/myfankui',
    name: '用户反馈',
    meta: {
      requireAuth: true,  //添加该字段，表示进入这个路由需要登录
    },
    component: resolve => require(['../view/home/myfankui/myfankui.vue'],resolve)
  }, {
    path: '/home/myshezhi',
    name: '系统设置',
    component: resolve => require(['../view/home/myshezhi/myshezhi.vue'],resolve)
  }, {
    path: '/home/myshezhi/about',
    name: '关于我们',
    component: resolve => require(['../view/home/myshezhi/about.vue'],resolve)
  }, {
    path: '/home/myshezhi/updatelog',
    name: '更新日志',
    component: resolve => require(['../view/home/myshezhi/updatelog.vue'],resolve)
  },{
    path: '/login',
    name: '登录',
    // component: login,
    component: resolve => require(['../view/login/login.vue'],resolve)
  }, {
    path: '/sign',
    name: '注册',
    // component: sign,
    component: resolve => require(['../view/login/sign.vue'],resolve)
  }]
})

// 用于检测路由问题
/* const originalPush = Router.prototype.push
Router.prototype.push = function push(location){
  return originalPush.call(this, location).catch(err => err)
} */

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
