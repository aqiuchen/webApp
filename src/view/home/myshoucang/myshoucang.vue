<template>
  <div class="myshoucang">
    <go-back :homeTitle="homeTitle"></go-back>
    <div class="myshoucang_main">
      <h5>功能测试板块</h5>
      <div class="myshoucang_main_list">
        <router-link v-for="(item,index) in tests" :key="index" :to="item.testUrl">{{item.testTitle}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import goBack from '../../../components/goBack.vue';
  export default{
    data(){
      return{
        homeTitle: '',
        tests: [{
          testTitle: '搜索框顶部布局',
          testUrl: '/home/myshoucang/test1'
        },{
          testTitle: '搜索框中部布局往上',
          testUrl: '/home/myshoucang/test2'
        },{
          testTitle: '搜索框中部布局往下',
          testUrl: '/home/myshoucang/test3'
        },{
          testTitle: '搜索框中部布局跳转子页面',
          testUrl: '/home/myshoucang/test4'
        }]
      }
    },
     mounted() {
      this.homeTitle = this.$route.query.title;
      console.log(this.$route.query.title)
    },
    components:{
      goBack
    }
  }
</script>

<style>
  @import '../../../assets/css/home/myshoucang.css';
</style>
