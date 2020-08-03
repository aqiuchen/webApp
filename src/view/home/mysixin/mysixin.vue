<template>
  <div class="mysixin">
    <go-back :homeTitle="homeTitle" @fatherFunction="fatherFunction"></go-back>
    <bottom-window1 v-if="isbw1"
      @fatherFunction="fatherFunction"
      @fatherFunction1="fatherFunction1"
      :fatherMsg="fatherMsg">
    </bottom-window1>
    <div lass="mysixin-main">
      <div class="mysixin-err">{{err}}</div>
      <!-- 循环每条信息 -->
      <div v-for="(item, index) in mysixin" :key="index" class="mysixin-list" @click="listClk(index)">
        <!-- 选中图标信息 -->
        <div class="mysixin-list-left" v-show="isInput">
          <img src="../../../../static/images/home/check-no.png" v-show="!item.isChecked" alt="未选中图标">
          <img src="../../../../static/images/home/check-yes.png" v-show="item.isChecked" alt="选中图标">
        </div>
        <!-- 显示信息 -->
        <div class="mysixin-list-main" :class="classObject">
          <!-- 头像 -->
          <div class="mysixin-list-img">
            <img :src="item.img" alt="头像">
          </div>
          <!-- 右侧信息 -->
          <div class="mysixin-list-right">
            <!-- 上部名字时间信息 -->
            <div class="mysixin-list-top">
              <h5>{{item.name}}</h5>
              <span>{{item.time}}</span>
            </div>
            <!-- 下部聊天内容 -->
            <div class="mysixin-list-msg">{{item.message}}</div>
          </div>
        </div>
      </div>
      <!-- 底部删除信息 -->
      <div class="mysixin-del" v-show="isSXBtn">
        <div class="mysixin-del-left" @click="all()">
          <div class="mysixin-del-img">
            <img src="../../../../static/images/home/check-no.png" v-show="!isAll" alt="未选中图标">
            <img src="../../../../static/images/home/check-yes.png" v-show="isAll" alt="选中图标">
          </div>
          <p>全选</p>
        </div>
        <span @click="del()">删除</span>
        <span @click="cmp()">完成</span>
      </div>
    </div>
  </div>
</template>

<script>
  import goBack from '../../../components/goBack.vue';
  import bottomWindow1 from '../../../components/bottomWindow1.vue';
  export default{
    data(){
      return{
        homeTitle: '我的私信',
        err: '',
        isbw1: false,//弹窗组件显示隐藏
        fatherMsg: [],//传递组件名字
        mysixin: [],
        sxCheckeds: [],//存放选中消息
        isAll: false,//底部全选图标显示隐藏
        isInput: false,//左侧删除图标显示隐藏
        classObject: {//删除图标显示隐藏时右侧展示内容布局class
          mysixinLeftOK: false,
          mysixinLeftNO: true
        },
        isSXBtn: false,//底部显示隐藏
      }
    },
    mounted() {
      this.axios({
        url: 'http://localhost:8081/static/json/msg.json',
        // url: 'http://192.168.0.106:8081/static/json/msg.json',
        // url: 'http://aqiu.dyfeiyu.com/static/json/msg.json',
        method: 'GET'
      }).then( res => {
        let datas = res.data.mysixin;
        for(let i in datas){
          // 添加一个img显示隐藏属性
          datas[i].isChecked = false;
        }
        this.mysixin = datas;
      }).catch( err => {
        this.err = '数据请求失败！'
        console.log(err)
      });
    },
    methods:{
      fatherFunction(){//事件传递子组件--显示组件&传递参数
        this.isbw1 = !this.isbw1;
        this.fatherMsg = ['编辑']
      },
      fatherFunction1(){//事件传递子组件--点击编辑事件
        this.isInput = true;
        this.mysixinLeftOK = true;
        this.mysixinLeftNO = false;
        this.isbw1 = false;
        this.isSXBtn = true;
      },
      listClk(index){//点击消息框
        const that = this;
        if(that.isInput){
          that.mysixin[index].isChecked = !that.mysixin[index].isChecked;
          // 如果当前点击图标是true表示开始未选中现在选中，那么直接添加当前id到sxCheckeds
          if(that.mysixin[index].isChecked == true){
            that.sxCheckeds.push(that.mysixin[index].id);
          }else{//如果取消选中就需要删除当前值
            for(let i in that.sxCheckeds){
              if(that.mysixin[index].id == that.sxCheckeds[i]){
                that.sxCheckeds.splice(i,1);
              }
            }
          };
          // 如果全部选中，全选按钮选中
          if(that.sxCheckeds.length == that.mysixin.length){
            that.isAll = true;
          }else{
            that.isAll = false;
          }
          // console.log('最终选中值：',that.sxCheckeds)
        }else{
          that.$router.push({
            path: '/home/mysixin/mysixinmain',
            query: {
              id: that.mysixin[index].id
            }
          })
        }
      },
      all(){//全选
        const that = this;
        that.isAll = !that.isAll;
        if(that.isAll){//全选
          that.sxCheckeds = [];
          that.mysixin.map((item) => {//map和forEach都一样
            item.isChecked = true;
            that.sxCheckeds.push(item.id);
          })
        }else{//反选
          that.sxCheckeds = [];
          that.mysixin.forEach((item) => {
            item.isChecked = false;
          })
        }
        // console.log(that.sxCheckeds);
      },
      del(){//删除
        let sxCheckeds = this.sxCheckeds;
        let mysixin = this.mysixin;
        let arr = mysixin;
        sxCheckeds.map((item, index) => {
          mysixin.map((itm, inx) => {
            if(item == itm.id){
              arr.splice(inx, 1);
            }
          })
        });
        this.mysixin = arr;
        this.sxCheckeds = [];
        if(this.mysixin.length == 0){
          this.err = '没有消息！'
          this.isAll = false;
        }
      },
      cmp(){//完成
        this.isInput = false;
        this.mysixinLeftOK = false;
        this.mysixinLeftNO = true;
        this.isSXBtn = false;
      },
    },
    components:{
      goBack,
      bottomWindow1
    }
  }
</script>

<style>
.mysixin{
  width: 94%;
  padding: 1rem 3% 1.2rem 3%;
}
.mysixin-err{
  width: 100%;
  text-align: center;
  font-size: 0.34rem;
}
.mysixin-main{
  /* border: 1px solid red; */
}
.mysixin-list{
  width: 100%;
  /* border: 1px solid red; */
  height: 1.5rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 0.02rem solid #dddddf;
}
.mysixin-list-left{
  /* border: 1px solid red; */
  width: 13%;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mysixin-list-left img{
  width: 0.5rem;
  height: 0.5rem;
}
.mysixin-list-main{
  padding: 0.1rem 0;
  height: 1.3rem;
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.mysixinLeftOK{
  width: 85%;
}
.mysixinLeftNO{
  width: 100%;
}
.mysixin-list-img{
  width: 20%;
  height: 1.3rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mysixin-list-img img{
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 0.03rem solid #42B983;
}
.mysixin-list-right{
  /* border: 1px solid red; */
  width: 78%;
  height: 1.2rem;
}
.mysixin-list-top{
  width: 100%;
  height: 0.4rem;
  line-height: 0.4rem;
  display: flex;
  justify-content: space-between;
}
.mysixin-list-top h5{
  font-size: 0.3rem;
}
.mysixin-list-top span{
  font-size: 0.28rem;
  color: #999999;
}
.mysixin-list-msg{
  width: 100%;
  margin-top: 0.1rem;
  text-align: justify;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;    /*显示行数*/
}
.mysixin-del{
  width: 90%;
  height: 0.8rem;
  font-size: 0.35rem;
  color: #42B983;
  padding: 0.1rem 5%;
  border-top: 0.02rem solid #dddddf;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: white;
  display: flex;
  justify-content: space-between;
}
.mysixin-del-left{
  display: flex;
  justify-content: flex-start;
  /* border: 1px solid red; */
}
.mysixin-del-img{
  /* border: 1px solid red; */
  width: 0.5rem;
  height: 0.5rem;
  margin: 0.15rem 0;
  position: relative;
  overflow: hidden;
}
.mysixin-del-left p{
  line-height: 0.8rem;
  margin-left: 0.1rem;
}
.mysixin-del-img img{
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
}
.mysixin-del span{
  line-height: 0.8rem;
}

</style>
