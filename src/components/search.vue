<template>
  <div class="components-search">
    <div class="vueone_search">
      <!-- 语音输入图标 -->
      <div class="search_img">
          <img src="../../static/images/nav/voice.png" @click="voice" alt="">
      </div>
      <!-- 搜索框 -->
      <div class="search_input">
        <input type="text" placeholder="探索新世界" v-model.trim="shareValue" class="search_input_val"
        @input="iptSearch" @focus="searchFocus()" @blur="searchBlur()">
        <img src="../../static/images/components/delet.png" alt="清空输入框图标" @click="deletVal" v-show="isDelet">
      </div>
      <!-- 搜索按钮 -->
      <button type="submit" @click="search" class="search_button">搜索</button>
    </div>
    <div class="search-main" v-show="isSelect">
      <!-- 下拉框 -->
      <div class="search-select-box">
        <div class="search-select" ref="select" :style="{marginTop: -heights + 'px'}">
          <div v-for="(item,index) in selects" :key="index" @click="selectClick(index)" class="select-list">{{item}}</div>
        </div>
      </div>
      <!-- 遮罩层 -->
      <div class="search-zzc" @touchmove.prevent></div>
    </div>
  </div>
</template>
<script>
export default{
	data(){
		return{
      shareValue: '', //搜索框值
      isDelet: false,
      isSelect: false,
      selects: [],
      lists: ['vue','vuex','音乐','视频','前端','JavaScript','jQuery','正则','阿秋','九湾','九湾科技','九湾村','前端程序员','计算属性',
      '监听','computed','watch','methods','生命周期','生命起源','阿秋正传','观致','观致5suv','旅行','自驾游','微信开发','开发','app开发',
      '九阴真经','九阳豆浆机','九五之尊','九头蛇','九阴白骨抓','小九湾','九湾大厦','辟邪剑谱','胡歌','杨超越','琅琊榜','火星救援','普罗米修斯'],
      heights: 0,
		}
	},
	// 生命周期钩子函数  （创建前）
	beforeCreate(){
    	// el 和data并未初始化  （el为渲染数据{{message}}）
    	//此处可添加loading事件
    },
    // 生命周期钩子函数 页面初始化使用（创建后）
    created(){
        //完成了data数据的初始化，el没有
        //结束loading
    },
    // 生命周期钩子函数 （载入前）
    beforeMount(){
        //完成了el和data初始化
    },
    // 生命周期钩子函数 （载入后）
    mounted(){
      //发起后端请求，拿回数据，配合路由钩子做一些事情
    },
    // 生命周期钩子函数 （更新前）
    beforeUpdate(){

    },
    // 生命周期钩子函数 （更新后）
    updated(){

    },
    // 生命周期钩子函数 （销毁前）
    beforeDestroy(){
        //你确认删除XX吗
    },
    // 生命周期钩子函数 （销毁后）
    destroyed(){
        //当前组件已被删除，清空相关内容
    },
    // 计算属性，所有涉及到复杂逻辑计算的都写在这里面，基于依赖缓存，只有相关依赖发生改变时才重新计算
    computed:{

    },
    // 组件引用
    components:{

    },
    // 事件，重新渲染时总会执行函数，而计算属性只要数据未改变都不会计算，直接获取缓存值
    methods:{
        search(){
          let shareValue = this.shareValue;
          if(shareValue == ''){
            alert('未输入任何值，请输入值后再搜索!')
          }else if(shareValue == '九湾科技'){
            this.$router.replace('/home/myshezhi/about')
          }else{
            alert(shareValue + '\n' + "正在通过量子技术搜索中...")
          }
        },
        voice(){
          alert("正在启用人工智能...")
        },
        iptSearch(){//监听输入框
          let that = this;
          if(that.shareValue.length > 10){//限制输入长度
            that.shareValue = that.shareValue.slice(0,10)
          };
          if(that.shareValue != ''){
            that.inputReg();
            that.getHeight();
            that.isDelet = true;
          }else{
            that.isSelect = false;
            that.isDelet = false;
          }
        },
        selectClick(index){//点击下拉框
          this.shareValue = this.selects[index];
          this.isSelect = false;
        },
        inputReg(){//正则匹配搜索值
          let arry = [];
          let reg = new RegExp(this.shareValue);
          for(let i in this.lists){
            if(this.lists[i].match(reg)){
              arry.push(this.lists[i])
            }
          };
          this.selects = arry;
          if(this.selects != ''){
            this.isSelect = true;
          }else{
            this.isSelect = false;
          }
        },
        getHeight(){//获取select框高度
          this.$nextTick(() => {//dom渲染完毕后再执行
            let offsetHeight = this.$refs.select.offsetHeight;
            let to = setInterval(() => {
              offsetHeight--;
              this.heights = offsetHeight;
              if(offsetHeight <= 0){
                clearInterval(to);
              }
            },1)
          })
        },
        deletVal(){//点击清空图标
          this.shareValue = '';
          this.isSelect = false;
          this.isDelet = false;
        },
       // 输入框获取焦点事件
        searchFocus(){

        },
        // 输入框失去焦点事件
        searchBlur(){

        },

    },
    // 监听数据发生变化时操作
    watch:{

    }
}
</script>
<style>
 .components-search{
   width: 100%;
   position: fixed;
   z-index: 999;
   top: 0;
   left: 0;
 }
.vueone_search{
    width: 92%;
    height: 0.7rem;
    padding: 0.2rem 4%;
    display: flex;
    justify-content: space-between;
    border-bottom: 0.02rem solid #dddddf;
    background-color: white;
    overflow: hidden;
}
.search_img img{
    width: 0.5rem;
    height: 0.5rem;
    margin: 0.1rem 0;
}
.search_input{
    width: 70%;
    position: relative;
}
.search_input_val{
  width: 100%;
  height: 0.7rem;
  border-radius: 0.2rem;
  text-align: center;
  border: none;
  background-color: #ededed;
  font-size: 0.3rem;
}
.search_input>img{
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
}
.search_button{
    width: 1rem;
    height: 0.6rem;
    border: none;
    border-radius: 0.1rem;
    background-color: #17b3a3;
    color: white;
    font-size: 0.3rem;
    outline: none;
    margin: 0.05rem 0;
}
/* 下部 */
 .search-main{
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
 }
 /* 下拉 */
.search-select-box{
  position: absolute;
  z-index: 99;
  width: 92%;
  left: 4%;
  overflow: hidden;
  background-color: white;
}
.search-select{
  width: 100%;
  min-height: 0;
  max-height: 3rem;
  overflow-y: auto;
  box-shadow: 0 0 0.1rem #999999;
  -moz-box-shadow: 0 0 0.1rem #999999;
  -moz-box-shadow: 0 0 0.1rem #999999;
  border-bottom: 0.04rem solid #dddddf;
}
.select-list{
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  font-size: 0.28rem;
}
/* 遮罩层 */
.search-zzc{
  width: 100%;
  background-color: #E3E3E3;
  opacity: 0.3;
  flex: 1;
}
</style>
