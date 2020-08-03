<template>
  <div class="mydianzan">
    <go-back :homeTitle="homeTitle"></go-back>
    <div class="mydianzan-main">
      <span v-for="(item,index) in cards" :key="index" @click="cardClk(item)" :class="item.objectClass">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
  import goBack from '../../../components/goBack.vue';
  export default{
    data(){
      return{
        homeTitle: '',
        cards: [],
      }
    },
    created() {
      let datas = ["帅","可爱","大猪蹄子","前端","程序猿","雪橇三傻","哈士奇","萨摩耶","阿拉斯加","美食家","自驾游","超级喜欢羊","羊肉汤","羊肉串"];
      const that = this;
      let arr = [];
      datas.map((item) => {
        let obj = {
          name: '',
          objectClass: {
            nocardClks: true,
            cardClks: false,
          }
        };
        obj.name = item;
        that.cards.push(obj);
      });
    },
    mounted() {
      this.homeTitle = this.$route.query.title;
    },
    methods:{
      cardClk(item){
        const that = this;
        if(item.objectClass.nocardClks){
          item.objectClass.nocardClks = false;
          item.objectClass.cardClks = true;
        }else{
          item.objectClass.nocardClks = true;
          item.objectClass.cardClks = false;
        }
      }
    },
    components:{
      goBack
    }
  }
</script>

<style>
.mydianzan{
  width: 94%;
  padding: 1rem 3%;
}
.mydianzan-main{
  /* border: 1px solid red; */
  /* overflow: hidden; */
}
.mydianzan-main span{
  display: block;
  float: left;
  padding: 0.1rem 0.2rem;
  border-radius: 0.2rem;
  margin: 0.3rem 0.3rem 0 0;
  font-size: 0.28rem;
}
.nocardClks{
  background-color: #f2f2f2;
}
.cardClks{
  background-color: #17B3A3;
  color: white;
}
</style>
