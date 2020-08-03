<template class="aaa">
  <div class="myxiaoxi">
    <go-back :homeTitle="homeTitle" @fatherFunction="fatherFunction"></go-back>
    <bottom-window1 v-if="isbw1"
      @fatherFunction="fatherFunction"
      @fatherFunction1="fatherFunction1"
      :fatherMsg="fatherMsg">
    </bottom-window1>
    <div class="myxiaoxi-main">
      <div class="myxiaoxi-main-list" v-for="(item, index) in messages" :key="index">
        <!-- <label> -->
          <!-- 复选框 -->
          <div class="myxiaoxi-main-left" v-show="isInput">
            <div class="myxiaoxi-main-left-box">
              <img src="../../../../static/images/home/check-no.png" v-show="!item.isChecked" alt="未选中图标">
              <img src="../../../../static/images/home/check-yes.png" v-show="item.isChecked" alt="选中图标">
              <input type="checkbox" ref="chx" :value="item.message" v-model="checkeds">
            </div>
          </div>
          <!-- 右侧信息 -->
          <div :class="classObject" class="myxiaoxi-main-list-right" @click="msgClk(index, $event)">
            <div class="myxiaoxi-main-top">
              <p>{{item.name}}</p>
              <span>{{item.time}}</span>
            </div>
            <div class="myxiaoxi-main-down">{{item.message}}</div>
          </div>
        <!-- </label> -->
      </div>
      <!-- 选择的值为:{{checkeds}} -->
      <div class="myxiaoxi-btn" v-show="isBtn">
        <div class="myxiaoxi-btn-left" @click="allClick()">
          <div class="myxiaoxi-btn-left-box">
            <img src="../../../../static/images/home/check-no.png" v-show="checkedAll == false" alt="未选中图标">
            <img src="../../../../static/images/home/check-yes.png" v-show="checkedAll == true" alt="选中图标">
            <input type="checkbox" id="all" v-model="checkedAll">
          </div>
          <label for="all">全选</label>
        </div>
        <button @click="del()">删除</button>
        <button @click="complate()">完成</button>
      </div>
      <div class="err">{{err}}</div>
    </div>
  </div>
</template>

<script>
  import goBack from '../../../components/goBack.vue';
  import bottomWindow1 from '../../../components/bottomWindow1.vue';
  export default{
    data(){
      return{
        homeTitle: '消息通知',
        err: '',
        isbw1: false,
        fatherMsg: [],
        messages: [],//所有循环数据
        checkeds: [],//存放选中的值
        isInput: false,
        classObject: {
          myxiaoxi_main_show: false,
          myxiaoxi_main_hidden: true
        },
        isBtn: false,
        checkedAll: '',//全选按钮值
      }
    },
    mounted() {
      this.axios({
        url: 'http://localhost:8081/static/json/msg.json',
        // url: 'http://192.168.0.106:8081/static/json/msg.json',
        // url: 'http://aqiu.dyfeiyu.com/static/json/msg.json',
        method: 'GET'
      }).then( res => {
        let myxiaoxi = res.data.myxiaoxi;
        for(let i in myxiaoxi){
          // 添加一个img显示隐藏属性
          myxiaoxi[i].isChecked = false;
        }
        this.messages = myxiaoxi;
      }).catch( err => {
        this.err = '数据请求失败！'
        console.log(err)
      });
    },
    methods: {
      fatherFunction(){//事件传递子组件--显示组件&传递参数
        this.isbw1 = !this.isbw1;
        this.fatherMsg = ['编辑']
      },
      fatherFunction1(){//事件传递子组件--点击编辑事件
        this.isInput = true;
        this.myxiaoxi_main_show = true;
        this.myxiaoxi_main_hidden = false;
        this.isbw1 = false;
        this.isBtn = true;
      },
      allClick(){//全选
        const that = this;
        for(let i in that.messages){
          if(that.checkedAll){//反选
            that.checkeds = [];
            that.messages[i].isChecked = false;
          }else{//全选
            that.checkeds = [];
            that.messages.forEach(item => {
              that.checkeds.push(item.message)
            });
            that.messages[i].isChecked = true;
          }
        }
      },
      del(){//删除
        const that = this;
        let checkeds = that.checkeds;
        let messages = that.messages;

        if(checkeds.length != 0){
          checkeds.forEach( item => {
            messages = messages.filter( messages => messages.message != item)
          });
          this.messages = messages;
          this.checkeds = [];
          if(that.messages == ''){
            that.err = '当前无消息！';
            that.checkedAll = false;
          }
        }else{
          console.log('未选中任何值');
        }
      },
      complate(){//完成
        this.isInput = false;
        this.myxiaoxi_main_show = false;
        this.myxiaoxi_main_hidden = true;
        this.isBtn = false;
      },
      msgClk(index, event){//点击消息框事件
        const that = this;
        // 判断此时的消息是处于可删除状态还是展示状态
        if(this.isBtn){
          let checked = event.target.checked;
          let ckd = that.$refs.chx[index].checked;
          let arr = that.checkeds;
          if(ckd){
            for(let i in that.checkeds){
              if(that.messages[index].message == that.checkeds[i]){
                arr.splice(i,1);
              }
            }
            that.checkeds = arr;
          }else{
            that.checkeds.push(that.messages[index].message);
          }
          that.messages[index].isChecked = !that.$refs.chx[index].checked;
          // console.log(that.checkeds)
          if(that.checkeds.length == that.messages.length && that.messages.length != 0){
            that.checkedAll = true;
          }else{
            that.checkedAll = false;
          }
        }else{
          this.$router.push({
            path: '/home/myxiaoxi/myxiaoximain',
            query: {
              id: this.messages[index].id
            }
          })
        }
      }
    },
    watch:{

    },
    components:{
      goBack,
      bottomWindow1
    }
  }
</script>

<style>
.err{
  width: 100%;
  text-align: center;
  font-size: 0.36rem;
  padding: 0.2rem 0;
}
.myxiaoxi{
  width: 94%;
  padding: 0.9rem 3% 1.2rem 3%;
  /* background-color: #f2f2f2; */
  overflow: hidden;
}
.myxiaoxi-main{
  /* border: 1px solid red; */
}
.myxiaoxi-main-list{
  width: 100%;
  margin-top: 0.2rem;
  background-color: white;
  height: 1.5rem;
  padding: 0.1rem 0;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  border-radius: 0.1rem;
  box-shadow: 0.02rem 0.02rem 0.1rem #666666;
}
.myxiaoxi-main-list label{
  width: 100%;
  /* border: 1px solid red; */
  height: 1.5rem;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.myxiaoxi-main-left{
  width: 16%;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.myxiaoxi-main-left-box input, .myxiaoxi-main-left-box img{
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  top: 0;
  left: 0;
}
.myxiaoxi-main-left-box input{
  opacity: 0;
}
.myxiaoxi-main-left-box img{
  /* opacity: 0; */
}
.myxiaoxi-main-left-box{
  width: 0.5rem;
  height: 0.5rem;
  /* border: 1px solid red; */
  position: relative;
  overflow: hidden;
}
.myxiaoxi-main-list .myxiaoxi-main-list-right{
  height: 1.5rem;
  padding: 0 2%;
  font-size: 0.3rem;
}
.myxiaoxi_main_show{
  width: 80%;
}
.myxiaoxi_main_hidden{
  width: 100%;
}
.myxiaoxi-main-top{
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 0.02rem solid #dddddf;
}
.myxiaoxi-main-top p{
  font-weight: bold;
}
.myxiaoxi-main-top span{
  color: #666666;
  font-size: 0.26rem;
}
.myxiaoxi-main-down{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-top: 0.1rem;
}
.myxiaoxi-btn{
  width: 94%;
  height: 1rem;
  padding: 0 3%;
  position: fixed;
  z-index: 60;
  bottom: 0;
  left: 0;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border-top: 0.02rem solid #dddddf;
  font-size: 0.3rem;
}
.myxiaoxi-btn-left{
  height: 0.5rem;
  margin: 0.25rem 0;
  display: flex;
  justify-content: flex-start;
}
.myxiaoxi-btn-left-box{
  width: 0.5rem;
  height: 0.5rem;
  position: relative;
  overflow: hidden;
}
.myxiaoxi-btn-left-box>input, .myxiaoxi-btn-left-box>img{
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  top: 0;
  left: 0;
}
.myxiaoxi-btn-left-box input{
  opacity: 0;
}
.myxiaoxi-btn-left label{
  display: block;
  height: 0.5rem;
  line-height: 0.5rem;
  margin-left: 0.1rem;
}
.myxiaoxi-btn>button{
  width: 1.2rem;
  height: 0.6rem;
  margin: 0.2rem 0;
  background-color: #42B983;
  color: white;
  border: none;
  border-radius: 0.1rem;
  font-size: 0.3rem;
}
</style>
