<template>
  <transition name="fade">
  <div class="shop">
    <div class="shop-box">
      <div class="shop-nav">
        {{err}}
        <router-link v-for="(item,index) in shopNavs" :key="index" @click.native="shopNavCli(index)"
          :class="{clkColor: index === number}"
          :to="{ path: shopPath, query: {id: item.id} }">
          {{item.name}}
        </router-link>
      </div>
      <div class="shop-main">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
  export default{
    data(){
      return{
        number: 0,
        shopPath: '/shop/shopchildren',
        shopNavs:[],
        err: '',
      }
    },
    mounted(){
      this.axios({
        url: 'http://localhost:8081/static/json/shopping/shopping.json',
        // url: 'http://192.168.1.8:8081/static/json/shopping/shopping.json',
        // url: 'http://aqiu.dyfeiyu.com/static/json/shopping/shopping.json',
        method: 'GET'
      }).then( res => {
				console.log('yes',res.data);
        let shop = res.data.shop;
        let arr = [];
        for(let i in shop){
          let obj = {
            name: '',
            id: ''
          };
          obj.name = shop[i].name;
          obj.id = shop[i].id;
          arr.push(obj);
        }
        this.shopNavs = arr;

        // 把跳转传参方法写在请求数据成功后面，避免未请求完成就跳转
        this.$router.push({//直接跳转到推荐子页面
          path: '/shop/shopchildren',
          query: {//query传参
            id: this.shopNavs[0].id
          }
        });

      }).catch( err => {
				console.log('err',err)
        this.err = '数据请求失败！'
        console.log(err)
      });
    },
    methods:{
      shopNavCli(index){
        this.number = index;
      }
    }
  }
</script>

<style>
  @import '../../assets/css/shop/shop.css'
</style>
