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
          <input type="text" class="test1_search" @input="tsInput()" @blur="blInput()" v-model="tsVal" placeholder="输入投资人">
        </div>
        <!-- 下拉展示框 -->
        <search-select></search-select>
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
  import searchSelect from '../../../../components/searchSelect.vue';
  import {mapState,mapActions,mapGetters} from 'vuex';
  export default{
    data(){
      return{
        homeTitle: '搜索框中部布局',
        tsVal: '',
      }
    },
    mounted(){

    },
    computed:{
      ...mapState({
        inputVal: state => state.searchSelect.inputVal,
      })
    },
    components:{
      goBack,
      searchSelect
    },
    methods:{
      tsInput(){
        this.$store.commit('getInputVal', this.tsVal);
        this.$store.commit('regSearch');
      },
      blInput(){
        // this.$store.commit('setIsList', false);
      }
    },
    watch:{
      inputVal(){//监听输入框的值
        this.tsVal = this.$store.state.searchSelect.inputVal;
      }
    }
  }
</script>

<style>
  @import '../../../../assets/css/home/myshoucang.css';
</style>
