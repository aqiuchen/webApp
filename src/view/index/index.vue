<template>
  <transition name="fade">
  <div class="vueone_index">
    <!-- 头部轮播图 -->
    <div class="index_banner">
      <index-banner></index-banner>
    </div>
    <!-- 功能板块 -->
    <div class="index_mod">
      <router-link v-for="(mod,index) in mods" :to="{path:mod.modPath, query:{title:mod.modTitle}}" :key="index">
        <img :src="mod.modImg" alt="">
        <p>{{mod.modTitle}}</p>
      </router-link>
    </div>
    <!-- 今日热点 -->
    <div class="now_hot">
      <!-- 标题栏 -->
      <div class="now_hot_top">
        <!-- <h5>今日热点</h5> -->
        <!-- <router-link to="/music">更多热点</router-link> -->
      </div>
      <!-- 热点列表 -->
      <div class="now_hot_main">
        <!-- 告示 -->
        <div class="index_gaoshi">
          <div class="index_gaoshi_top">
            <h5>告示</h5>
          </div>
          <p>嗨~ <span>{{userName}}</span></p>
          <p>欢迎来到九湾科技app</p>
          <p>在使用前，请看看这里，这里有关于app的介绍，让你能更快地上手。</p>
          <p>app主业务分为三大板块：前端、音乐、商城。</p>
          <p>目前实现的功能有：</p>
          <p><b>登录：</b>部分功能需要登录权限，请输入有效手机号码，验证码为 123456 点击登录即可。</p>
          <p><b>首页：</b>PC端首页更新为商品展示。签到：只实现了模拟签到功能。重点推荐：学习功能中已将考试系统打通，目前试题库正在开发中，
          这将是最近的重点工作，待学习板块开发完毕，将是提升前端程序员的一个好方法，敬请期待！</p>
          <p><b>前端：</b>原新闻版块更换为前端技术板块，用于分享技术知识，由于未做后台管理系统，需手动输入带标签文本，太繁琐，故每次只更新
          一小部分技术分享。</p>
          <p><b>音乐：</b>每日推荐中实现了播放音乐功能，包含切歌、播放完自动播放下一首，目前以接入网易云音乐外部链接，可在线播放。排行榜实现了榜单展示功能。</p>
          <!-- <p><b>视频：</b>还是受限于服务器容量，视频目前没做上传，只做了布局。</p> -->
          <p><b>商城：</b>将视频板块替换为商城，可展示多种类商品，目前只做了简单分类展示，具体商品待实际需求再做更新。</p>
          <p>还有一些页面小功能也已实现，这里就不详细说明，更多功能请自行体验吧。</p>
          <p><b>新增功能：</b>新增顶部搜索模糊匹配，若输入的关键字在数据库中，那么将下拉弹出相似的关键词供选择。试试输入'九'关键字看看吧！</p>
          <p>如果感兴趣请联系我吧：<i>QQ 534613678</i></p>
          <p>最后还要感谢老王的服务器，老王是个好人！</p>
          <p>更新日志：2019-11-12</p>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>
<script>
  import indexBanner from '../../components/indexBanner.vue'
  export default {
    data() {
      return {
        userName: '',
        mods: [{
          modPath: '/index/qiandao',
          modImg: require('../../../static/images/index/index_qd.png'),
          modTitle: '签到'
        }, {
          modPath: '/index/yundong',
          modImg: require('../../../static/images/index/index_yd.png'),
          modTitle: '运动'
        }, {
          modPath: '/index/bianqian',
          modImg: require('../../../static/images/index/index_bq.png'),
          modTitle: '便签'
        }, {
          modPath: '/index/dushu',
          modImg: require('../../../static/images/index/index_ds.png'),
          modTitle: '读书'
        }, {
          modPath: '/index/changge',
          modImg: require('../../../static/images/index/index_cg.png'),
          modTitle: '唱歌'
        }, {
          modPath: '/index/xuexi',
          modImg: require('../../../static/images/index/index_xx.png'),
          modTitle: '学习'
        }],
        isHot: true,
        hots: [],
        hotsErr: ''
      }
    },
    // 生命周期钩子函数  （创建前）
    beforeCreate() {
      // el 和data并未初始化  （el为渲染数据{{message}}）
      //此处可添加loading事件
    },
    // 生命周期钩子函数 页面初始化使用（创建后）
    created() {
      //完成了data数据的初始化，el没有
      //结束loading
    },
    // 生命周期钩子函数 （载入前）
    beforeMount() {
      //完成了el和data初始化
    },
    // 生命周期钩子函数 （载入后）
    mounted() {
      // 获取登录信息
      let info = JSON.parse(localStorage.getItem('account'));
      if (info == null || info == undefined || info == ' ') {
        this.userName = '未登录';
      } else {
        this.userName = info.phoneNumber;
      };
      // 判断终端类型舔砖对应页面
      let isPhone = this.isPhone();
      if(isPhone){
        this.$router.replace('/index');
      }else{
        this.$router.replace('/pcIndex');
      };
    },
    // 生命周期钩子函数 （更新前）
    beforeUpdate() {

    },
    // 生命周期钩子函数 （更新后）
    updated() {

    },
    // 生命周期钩子函数 （销毁前）
    beforeDestroy() {
      //你确认删除XX吗
    },
    // 生命周期钩子函数 （销毁后）
    destroyed() {
      //当前组件已被删除，清空相关内容
    },
    // 计算属性，所有涉及到复杂逻辑计算的都写在这里面，基于依赖缓存，只有相关依赖发生改变时才重新计算
    computed: {

    },
    // 组件引用
    components: {
      indexBanner,
    },
    // 事件，重新渲染时总会执行函数，而计算属性只要数据未改变都不会计算，直接获取缓存值
    methods: {
      // 判断终端类型显示相应的页面
      isPhone(){
         let mobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
        return mobile != null
      },
    },
    // 监听数据发生变化时操作
    watch: {

    }
  }
</script>
<style>
  @import '../../assets/css/index/index.css'
</style>
