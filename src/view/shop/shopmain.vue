<template>
  <div class="shopmain">
    <!-- 顶部返回 -->
    <go-back :homeTitle="homeTitle"></go-back>
    {{err}}
    <div class="shopmain-content">
      <img :src="imgUrl">
      <h5>{{title}}</h5>
      <p>{{detail}}</p>
    </div>
  </div>
</template>

<script>
  import goBack from '../../components/goBack.vue';
  export default{
    data(){
      return{
        homeTitle: '商品详情',
        err: '',
        imgUrl: '',
        title: '',
        detail: '',
      }
    },
    mounted(){
      const clkID = this.$route.query.clkID;//大类id
      const id = this.$route.query.id;//小类id
      // console.log(clkID,id)
      this.axios({
        url: 'http://localhost:8081/static/json/shopping/shopping.json',
        // url: 'http://172.20.10.3:8081/static/json/shopping/shopping.json',
        // url: 'http://aqiu.dyfeiyu.com/static/json/shopping/shopping.json',
        method: 'GET'
      }).then(res => {
        let shop = res.data.shop;
        for(let i in shop){
          if(clkID == shop[i].id){
            for(let j in shop[i].shopList){
              if(id == shop[i].shopList[j].id){
                this.imgUrl = shop[i].shopList[j].imgurl;
                this.title = shop[i].shopList[j].title;
                this.detail = shop[i].shopList[j].jieshao;
              }
            }
          }
        }
      }).catch(err => {
        this.err = '数据获取失败！';
        console.log(err);
      })
    },
    methods:{

    },
    components: {
      goBack
    }
  }
</script>

<style>
  @import '../../assets/css/shop/shopmain.css'
</style>
