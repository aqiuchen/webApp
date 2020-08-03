<template>
  <transition name="fade">
    <div class="shop-children">
      {{id}}
      {{err}}
      <router-link v-for="(item,index) in shopLists" :to="{path: shopPath, query: {clkID: clkID, id: item.id}}" :key="index">
        <img :src="item.imgurl">
        <p>{{item.title}}</p>
      </router-link>
    </div>
  </transition>
</template>

<script>
  export default{
    data(){
      return{
        shopPath: '/shopmain',
        shopLists: [],
        shop: {},//所有商品的json数据
        err: '',
        clkID: '',
      }
    },
    mounted(){
      this.axios({
        url: 'http://localhost:8081/static/json/shopping/shopping.json',
        // url: 'http://192.168.1.8:8081/static/json/shopping/shopping.json',
        // url: 'http://aqiu.dyfeiyu.com/static/json/shopping/shopping.json',
        method: 'GET'
      }).then( res => {
        this.shop = res.data.shop;
      }).catch( err => {
        this.err = '数据请求失败！'
        console.log(err)
      })
    },
    methods:{

    },
    computed:{
      id(){
        let that = this;
        that.clkID = that.$route.query.id
        // console.log(that.clkID);
        let shop = that.shop;
        // console.log('shop数据为：',shop)
        for(let i in shop){
          let shopID = shop[i].id;
          // console.log(name);
          if(that.clkID == shopID){
            that.shopLists = shop[i].shopList;
          }
        }
      }
    },
    watch: {

    }
  }
</script>

<style>
 .shop-children{
   width: 100%;
   padding-bottom: 1.2rem;
   /* border: 1px solid red; */
   display: flex;
   justify-content: space-between;
   flex-wrap: wrap;
 }
 .shop-children a{
   width: 2.5rem;
   margin-top: 0.2rem;
 }
 .shop-children a img{
   width: 100%;
   height: 2rem;
   border-radius: 0.1rem;
 }
 .shop-children a p{
   width: 100%;
   font-size: 0.26rem;
   text-align: center;
   color: #666666;
   margin-top: 0.1rem;
 }
</style>
