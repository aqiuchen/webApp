<template>
  <div class="test4">
    <div class="test1_main">
      <div class="test1_main_top">
        <input type="text" class="test1_search" @input="tsInput1()" v-model="tsVal1" placeholder="请输入搜索内容">
      </div>
      <div class="test1_main_ul">
        <ul class="test1_main_list" v-show="isList">
          <li v-for="(item,index) in test1s" :key="index" @click="liClick(item)">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        homeTitle: '搜索框顶部布局',
        tsVal1: '',
        test1s: [],
        isList: false,
      }
    },
    methods: {
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
    },
    components:{
    }
  }
</script>

<style>
  @import '../../../../assets/css/home/myshoucang.css';
</style>
