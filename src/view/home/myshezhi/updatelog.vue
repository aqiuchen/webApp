<template>
  <div class="updateLog">
    <!-- 返回组件 -->
    <go-back :homeTitle="homeTitle"></go-back>
    <div class="updateLog-main">
      <!-- <h5>更新日志</h5> -->
      <p>新增更新日志页，主要是为了知道每个版本做了什么，方便后期对问题进行回溯可以找到对应的版本。</p>
      <p><span>2019-11-11</span>修复音乐播放组件播放完毕自动播放下一首bug；新增音乐-每日推荐歌曲为网易云音乐外部链接。</p>
      <p><span>2019-11-12</span>取消根据实时监听屏幕尺寸跳转移动端或PC端首页，改为通过识别终端类型跳转；修复刷新跳转首页bug，改为在两个首页分别进行加载识别终端跳转；清除无用图片，减少体积；完善我的消息页面样式--添加复选框图标(此处替换掉label标签，将label标签功能替代为事件触发)；又对一系列样式进行手机端测试调整！</p>
      <p><span>2019-11-13</span>新增说明txt文本，主要方便查看哪些页面在打包上线前需要修改服务器地址，避免每次打包后遗漏部分页面导致返工；新增消息列表详细页，对消息列表点击事件进行逻辑判断，如果正常展示列表点击则进入消息详细页；调整用户反馈页面样式。</p>
      <p><span>2019-11-14</span>新增私信信息页和私信详细页，与消息页面类似，但抛弃了使用checkbox属性，完全使用图标替代，体验更好！</p>
      <p><span>2019-11-25</span>增加提示弹窗组件宽度；将我的点赞替换为我的标签并实现点击选中；</p>
    </div>
  </div>
</template>

<script>
import goBack from '../../../components/goBack.vue';
  export default{
    data(){
      return{
        homeTitle: '更新日志'
      }
    },
    mounted() {

    },
    components:{
      goBack,
    }
  }
</script>

<style>
.updateLog{
  width: 94%;
  padding: 0.8rem 3% 0 3%;
}
.updateLog-main{
  font-size: 0.3rem;
}
.updateLog-main h5{
  width: 100%;
  text-align: center;
  margin: 0.3rem 0;
}
.updateLog-main p{
  margin-top: 0.2rem;
  text-align: justify;
}
.updateLog-main span{
  margin-right: 0.2rem;
  color: #42B983;
}
</style>
