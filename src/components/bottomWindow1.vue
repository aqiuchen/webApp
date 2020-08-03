<template>
  <div class="bottomWindow1">
    <div class="bwZzc" @click="bwZzcClk()" @touchmove.prevent></div>
    <div class="bottomWindow1-main" ref="bottomWindow1" :style="{bottom: -heightVal + 'px'}">
      <div class="bottomWindow1-main-lists">
        <div v-for="(item, index) in fatherMsg" :key="index" @click="bwClk(item)">{{item}}</div>
      </div>
      <div class="bottomWindow1-cnl" @click="cnlClk()">取消</div>
    </div>
  </div>
</template>

<script>
  export default{
    props: ['fatherMsg'],
    data(){
      return{
        heightVal: 0,
      }
    },
    mounted(){
      // 调用展开动画
      this.donghuaOpen();
    },
    methods: {
      bwZzcClk(){
        // 点击遮罩层关闭动画
        this.donghuaClose();
      },
      bwClk(item){
        console.log(item);
        // 不同的功能调用不同的事件
        if(item == '编辑'){
          this.$emit('fatherFunction1');
        };
        if(item == '排版'){
          this.$emit('fatherFunction2');
        }
      },
      cnlClk(){
        // 调用关闭动画
        this.donghuaClose();
      },
      donghuaOpen(){//展开动画
        this.$nextTick(() => {
          const bottomWindow = this.$refs.bottomWindow1;
          let heightVal = bottomWindow.offsetHeight;
          // console.log(heightVal);
          let to = setInterval(() => {
            // heightVal--;
            heightVal = heightVal - 4;
            // console.log(heightVal);
            this.heightVal = heightVal;
            if(heightVal <= -10){
              clearInterval(to);
            }
          },1)
        })
      },
      donghuaClose(){//关闭动画
      const that = this;
        this.$nextTick(() => {
          const bottomWindow = this.$refs.bottomWindow1;
          let heightVal = bottomWindow.offsetHeight;
          let a = 10;
          let to = setInterval(() => {
            // a--;
            a = a - 5;
            this.heightVal = -a;
            if(a <= -heightVal){
              clearInterval(to);
              // 调用父组件事件关闭组件
              this.$emit('fatherFunction');
            }
          },1)
        })
      }
    }
  }
</script>

<style>
.bottomWindow1{
  width: 100%;
  /* border: 1px solid red; */
  overflow: hidden;
}
.bwZzc{
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 90;
  background-color: #999999;
  opacity: 0.5;
  left: 0;
  top: 0;
}
.bottomWindow1-main{
  /* border: 1px solid red; */
  position: fixed;
  z-index: 98;
  bottom: 0.2rem;
  width: 90%;
  left: 5%;
  /* color: #007AFF; */
  color: #42B983;
  font-size: 0.34rem;
  text-align: center;
}
.bottomWindow1-main-lists{
  border-radius: 0.2rem;
  background-color: white;
  margin-bottom: 0.2rem;
}
.bottomWindow1-main-lists>div{
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  border-bottom: 0.02rem solid #dddddf;
}
.bottomWindow1-main-lists>div:last-of-type{
  border-bottom: none;
}
.bottomWindow1-cnl{
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  border-radius: 0.2rem;
  background-color: white;
}
</style>
