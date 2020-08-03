<template>
  <div class="myxiaoxiMain">
    <go-back :homeTitle="homeTitle"></go-back>
    <div class="myxiaoxiMain-main">
      {{err}}
      <div class="myxiaoxiMain-main-top">
        <span>{{msgMain.time}}</span>
      </div>
      <div class="myxiaoxiMain-main-content">{{msgMain.message}}</div>
    </div>
  </div>
</template>

<script>
import goBack from '../../../components/goBack.vue';
export default{
  data(){
    return{
      homeTitle: '',
      msgMain: [],
      err: '',
    }
  },
  mounted(){
    let id = this.$route.query.id;
    this.axios({
      url: 'http://localhost:8081/static/json/msg.json',
      // url: 'http://192.168.0.106:8081/static/json/msg.json',
      // url: 'http://aqiu.dyfeiyu.com/static/json/msg.json',
      method: 'GET'
    }).then( res => {
      let myxiaoxi = res.data.myxiaoxi;
      myxiaoxi.map((item, index) => {
        if(id === item.id){
          this.msgMain = item;
          this.homeTitle = item.name;
        }
      })
    }).catch( err => {
      this.err = '获取数据失败!';
      console.log(err);
    })
  },
  components:{
    goBack
  }
}
</script>

<style>
.myxiaoxiMain{
  width:100%;
  padding-top: 1rem;

}
.myxiaoxiMain-main{
  /* border: 1px solid red; */
}
.myxiaoxiMain-main-top{
  width: 94%;
  padding: 0.1rem 3%;
  text-align: center;
  /* border-bottom: 0.02rem solid #dddddf; */
}
.myxiaoxiMain-main-top h5{
  font-size: 0.34rem;
}
.myxiaoxiMain-main-top span{
  font-size: 0.28rem;
  color: #666666;
  margin-top: 0.1rem;
}
.myxiaoxiMain-main-content{
  width: 94%;
  padding: 0.2rem 3%;
  text-align: justify;
  font-size: 0.3rem;
  line-height: 0.5rem;
}
</style>
