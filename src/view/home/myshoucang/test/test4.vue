<template>
  <div class="test2">
    <go-back :homeTitle="homeTitle"></go-back>
    <div class="test2_main">
      <div class="test2_main_list">
        <ul class="test2_title">
        	<li style="width: 25%">认购状态</li>
        	<li style="width: 25%">票息类型</li>
        	<li style="width: 25%">期限</li>
        	<li style="width: 25%">发行价格(元)</li>
        </ul>
        <ul class="test2_value" style="border: none">
        	<li style="width: 25%">认购中</li>
        	<li style="width: 25%">零息</li>
        	<li style="width: 25%">1M</li>
        	<li style="width: 25%">100</li>
        </ul>
        <ul class="test2_title">
        	<li style="width: 25%">参考收益率(%)</li>
        	<li style="width: 25%">付息频率</li>
        	<li style="width: 25%">发行日</li>
        	<li style="width: 25%">起息日</li>
        </ul>
        <ul class="test2_value" style="border: none">
        	<li style="width: 25%">3.1234</li>
        	<li style="width: 25%">1M</li>
        	<li style="width: 25%">20190101</li>
        	<li style="width: 25%">20190102</li>
        </ul>
        <ul class="test2_title">
        	<li style="width: 25%">到期日</li>
        	<li style="width: 25%">参考兑付日</li>
        	<li style="width: 25%">计划发行量(亿元)</li>
        	<li style="width: 25%">剩余发行量(亿元)</li>
        </ul>
        <ul class="test2_value" style="border: none">
        	<li style="width: 25%">20200101</li>
        	<li style="width: 25%">20200101</li>
        	<li style="width: 25%">10</li>
        	<li style="width: 25%">8</li>
        </ul>
      </div>
      <div class="test2_input">
        <div>
          <span>所属法人名称</span>
          <input type="text" placeholder="输入法人名称">
        </div>
        <div>
          <span>所属法人对公客户编号</span>
          <input type="text" placeholder="输入法人对公客户编号">
        </div>
        <div>
          <span>投资人</span>
          <input type="text" class="test1_search" @focus="tsInputs()" v-model="tsVal1" placeholder="输入投资人">
        </div>
        <div>
          <span>认购量</span>
          <input type="text" placeholder="输入认购量">
        </div>
        <div>
          <span>认购比例上限</span>
          <input type="text" placeholder="输入认购比例上限">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import goBack from '../../../../components/goBack.vue';
  export default{
    data(){
      return{
        homeTitle: '搜索框中部布局跳转子页面',
        tsVal1: '',
      }
    },
    components:{
      goBack
    },
    methods:{
      tsInputs(){
        this.$router.replace('/home/myshoucang/test1');
      },
    },
    created(){
      console.log(this.$route.query.tsVal1);
      this.tsVal1 = this.$route.query.tsVal1;
    }
  }
</script>

<style>
  @import '../../../../assets/css/home/myshoucang.css';
</style>
