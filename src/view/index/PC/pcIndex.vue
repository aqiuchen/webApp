<template>
  <div class="pcIndex">
    <div class="pcIndex-head">
      <h3>弘基投影仪家族</h3>
      <!-- <pc-index-banner></pc-index-banner> -->
      <div class="pcIndex-head-main">
        <!-- <div class="pcIndex-head-main-top">
          <h5>告示</h5>
        </div> -->
        <p>欢迎来到九湾科技，我们的主打产品是弘基投影仪，我们的价格也是同行最低，属于弘基官方授权点。</p>
        <p>现在您访问的是电脑页面，该页面只展示了产品信息，如果您想更进一步了解产品以及购买意向，请通过手机微信、支付宝扫码进入移动端页面，
        里面有更详细的介绍说明，也可以在手机浏览器输入 http://aqiu.dyfeiyu.com 进行访问。</p>
        <p>弘基投影仪是全球知名品牌，具有寿命长、能耗低、发热小、输出画质高清等优点。</p>
        <p>目前使用的场景有：</p>
        <p><b>会议室：</b>根据会议室大小可选择适合的产品进行投放。</p>
        <p><b>家庭影院：</b>配合幕布，最高可投放4k超清视频，还赠送高保真影像下同，带来极致视听体验，在家也能看大片！</p>
        <p><b>商场广告墙：</b>室内大屏广告，走廊广告墙拼接等，细腻高清的画质可将商品/信息展示地淋漓尽致！</p>
        <p><b>落地投影：</b>可用于长走廊通道地板投影，营造画一样的意境！</p>
        <p>如果感兴趣请联系我吧：<i>QQ 534613678</i>&nbsp;&nbsp;<i>手机 13980820954</i></p>
        <p>更新日志：2019-11-13</p>
      </div>
    </div>
    <h5>以下产品，请通过手机扫码访问了解详细信息及购买！</h5>
    <div class="pcIndex-content">
      <div class="pcIndex-content-main">
        {{err}}
        <div v-for="(item,index) in tyyLists" :key="index" class="pcIndex-content-list" @click="tyyClk(index)">
          <img :src="item.imgUrl" alt="展示图片">
          <h5>{{item.tyyTitle}}</h5>
          <p>{{item.tyyState}}</p>
        </div>
      </div>
    </div>
    <div class="pcIndex-bottom">
      <p>作者：阿秋.</p>
      <p>使用技术：vue + vue-router + axios + vuex + swiper + rem.</p>
      <p>gitHub：<a href="https://github.com/aqiuchen/jiuwan.CO.LTD.git">https://github.com/aqiuchen/jiuwan.CO.LTD.git</a> -欢迎关注！</p>
    </div>
    <div class="pcIndex-ewm">
      <img src="../../../../static/images/home/ewm.png" alt="二维码">
      <p>可通过微信、QQ、支付宝扫码进入移动端</p>
    </div>
  </div>
</template>
<script>
  import pcIndexBanner from '../../../components/pcIndexBanner.vue'
  export default{
    data(){
      return{
        tyyLists: [],
        err: '',
      }
    },
    mounted(){
      // 判断终端类型舔砖对应页面
      let isPhone = this.isPhone();
      if(isPhone){
        this.$router.replace('/index');
      }else{
        this.$router.replace('/pcIndex');
      };
      this.axios({
        url: 'http://localhost:8081/static/json/shopping/shopping.json',
        // url: 'http://172.20.10.3:8081/static/json/shopping/shopping.json',
        // url: 'http://aqiu.dyfeiyu.com/static/json/shopping/shopping.json',
        method: 'GET',
      }).then(res => {
        this.tyyLists = res.data.tyyLists;
      }).catch(err => {
        this.err = '数据加载失败！';
      })
    },
    methods:{
      // 判断终端类型显示相应的页面
      isPhone(){
         let mobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
        return mobile != null
      },
      tyyClk(index){//点击商品进入详情页
        // console.log(this.tyyLists[index].id)
        this.$router.push({
          path: '/pcListDetail',
          query: {
            id: this.tyyLists[index].id
          }
        })
      }
    },
    components:{
      pcIndexBanner
    }
  }
</script>
<style>
  @import '../../../assets/css/index/pcIndex.css';
</style>
