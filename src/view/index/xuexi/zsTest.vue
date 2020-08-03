<template>
  <div class="zsShiti">
    <!-- 弹窗组件 -->
    <pops v-show="isPops" @popsBtnFalse="popsBtnFalse" @popsBtnTrue="popsBtnTrue" :popsMessage="popsMessage"></pops>
    <div class="zsShiti_main">
      {{errMassage}}
      <h5>{{zsTitle}}</h5>
      <div class="zsShiti_content">
        <p v-html="zsTrue"></p>
      </div>
      <p class="zsShiti_ts">{{zsTs}}</p>
      <div class="zsShiti_btn">
        <button @click="zsbtnNext">下一个</button>
        <button @click="zsbtnSubmit">结束</button>
      </div>
    </div>
  </div>
</template>

<script>
  import pops from '../../../components/pops.vue';
  import {mapState, mapActions, mapGetters} from 'vuex';
  export default{
    data(){
      return{
        isPops: false, //弹窗显示隐藏
        popsMessage: '', //弹窗内容
        errMassage: '', //请求失败提示
      }
    },
    mounted(){
      this.axios({
        url: 'http://localhost:8081/static/json/zs/zs-vue.json',
        // url: 'http://172.20.10.3:8081/static/json/zs/zs-vue.json',
        // url: 'http://aqiu.dyfeiyu.com/static/json/zs/zs-vue.json',
        method: 'GET'
      }).then(res => {
        this.$store.commit('zsLoding', res.data.Vue);
      }).catch(err => {
        this.errMassage = '数据请求失败！'
        console.log(err)
      })
    },
    computed:{
      ...mapState({
        zsTitle:state => state.zsTest.zsTitle,
        zsTrue:state => state.zsTest.zsTrue,
        zsTs:state => state.zsTest.zsTs,
      })
    },
    methods:{
      // 下一个
      zsbtnNext(){
        this.$store.commit('zsNext');
      },
      // 结束
      zsbtnSubmit(){
        this.$store.commit('zsOver');
        // 弹出提示框
        this.isPops = true;
        // 将提示内容传递到提示框内
        this.popsMessage = '恭喜您完成知识累积，继续加油!';
      },
      // 接收提示框组件取消按钮传递的值
      popsBtnFalse(data) {
        this.$router.replace('/index/xuexi/zhishi');
      },
      // 将提示框组件确定按钮的方法传递过去
      popsBtnTrue() {
        this.$router.replace('/index/xuexi/zhishi');
      }
    },
    components:{
      pops,
    }
  }
</script>

<style>
.zsShiti{
  border: 0.02rem solid #999999;
  padding: 0.2rem;
  border-radius: 0.2rem;
  box-shadow: 0 0 0.1rem #999999;
  margin-top: 0.5rem;
}
.zsShiti_main{
  /* border: 1px solid red; */
}
.zsShiti_content{
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  min-height: 2rem;
  padding: 0.2rem;
  margin-top: 0.2rem;
}
.zsShiti_main h5{
  font-size: 0.32rem;
  padding: 0.1rem 0;
  font-weight: normal;
  color: #42B983;
  border-bottom: 0.02rem solid #42B983;
}
.zsShiti_content p{
  font-size: 0.28rem;
  font-weight: normal;
  color: #666;
  text-align: justify;
}
.zsShiti_content span{
  color: red;
}
.zsShiti_ts {
    width: 100%;
    text-align: center;
    font-size: 0.24rem;
    color: red;
    margin: 0.1rem 0;
  }
.zsShiti_btn{
  margin-top: 0.2rem;
  display: flex;
  width: 80%;
  padding: 0 10%;
  justify-content: space-around;
}
.zsShiti_btn button{
  width: 1.4rem;
  height: 0.6rem;
  line-height: 0.6rem;
  background-color: #42B983;
  color: white;
  font-size: 0.28rem;
  border: none;
  border-radius: 0.1rem;
}
</style>
