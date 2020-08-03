<template>
  <div class="pcListDetail">
    <div class="pcListDetail-top">
      <h5>{{listDetail.tyyTitle}}</h5>
      <p>{{listDetail.tyyState}}</p>
      <img :src="listDetail.imgUrl">
    </div>
    <div class="pcListDetail-main">
      <p>{{listDetail.tyyState1}}</p>
      <p>{{listDetail.tyyState2}}</p>
      <p>{{listDetail.tyyState3}}</p>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        listDetail: {},
      }
    },
    mounted(){
      const id = this.$route.query.id;
      console.log(id);
      this.axios({
        url: 'http://localhost:8081/static/json/shopping/shopping.json',
        // url: 'http://172.20.10.3:8081/static/json/shopping/shopping.json',
        // url: 'http://aqiu.dyfeiyu.com/static/json/shopping/shopping.json',
        method: 'GET',
      }).then(res => {
        let tyyLists = res.data.tyyLists;
        for(let i in tyyLists){
          if(id == tyyLists[i].id){
            this.listDetail = tyyLists[i];
            console.log(this.listDetail);
          }
        }
      }).catch(err => {
        this.err = '数据加载失败！';
      })
    },
  }
</script>

<style>
.pcListDetail{
  width: 1200px;
  padding: 10px 0;
  /* border: 1px solid red; */
  margin: 0 auto;
}
.pcListDetail-top{
 text-align: center;
}
.pcListDetail-top h5{
  font-size: 20px;
}
.pcListDetail-top p{
  font-size: 16px;
  margin: 20px 0;
}
.pcListDetail-top img{

}
.pcListDetail-main{
  margin: 20px 0;
}
.pcListDetail-main p{
  font-size: 14px;
  text-indent: 2em;
  margin: 10px 0 0 0;
}
</style>
