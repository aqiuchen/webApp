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
          <input type="text" class="test1_search" @input="tsInput1()" v-model="tsVal1" placeholder="输入投资人">
        </div>
				<!-- 下拉展示框 -->
				<div class="test2_select" style="padding: 0; border: none;">
				  <ul v-show="isList">
				    <li v-for="(item,index) in test1s" :key="index" @click="liClick(item)">{{item}}</li>
				  </ul>
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
        homeTitle: '搜索框中部布局',
        tsVal1: '',
        test1s: [],
        isList: false,
      }
    },
    components:{
      goBack
    },
    methods:{
      tsInput1(){
        this.tsSearch1();
        if(this.test1s != ''){
          this.isList = true;
        }else{
          this.isList = false;
        }
      },
      tsSearch1(){
        let lists = ["中国建设银行","中国工商银行","中国农业银行","招商银行","天府银行","天地银行","招商银行","光大银行","华夏银行",
        "攀枝花商业银行","中国邮政储蓄银行","四川农村信用社","农商银行","成都银行","贵阳银行","包商银行","浙商银行","重庆银行","北京银行",
        "上海银行","绵阳商行","南充商行","民生银行","中国银行","成都交投","四川交投","四川城投","成都新希望集团","南充南运集团","南充交投",
        "南充城建","九湾科技","九湾航天","九湾金融","九湾军工","九湾云","九湾建设","南宁城建","中央金融","中东石油"];
        let arrys = [];
        let tsVal1 = this.tsVal1;
        let reg = new RegExp(tsVal1);
        if(tsVal1 != ''){
          for(let i in lists){
            if(lists[i].match(reg)){
              arrys.push(lists[i])
            }
          }
        }else{
          this.isList = false;
        }
        this.test1s = arrys;
      },
      liClick(item){
        this.tsVal1 = item;
        this.isList = false;
      }
    }
  }
</script>

<style>
  @import '../../../../assets/css/home/myshoucang.css';
</style>
