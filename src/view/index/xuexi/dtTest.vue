<template>
  <div class="dtShiti">
    <!-- 弹窗组件 -->
    <pops v-show="isPops" @popsBtnFalse="popsBtnFalse" @popsBtnTrue="popsBtnTrue" :popsMessage="popsMessage"></pops>
    <div class="dtShiti_main">
      {{errMassage}}
      <h3>{{dtType}}</h3>
      <div class="dtShiti_content">
        <h5>{{dtTitle}}</h5>
        <form>
          <div v-for="(dt,index) in dtOption" :key="index">
            <input type="radio" :id="index" name="dtMain" :value="dtOption[index]" @click="dtRadioVal(dtOption[index])" v-model="dtModel">
            <label :for="index">{{dtOption[index]}}</label>
          </div>
        </form>
      </div>
      <p class="dtShiti_ts">{{dtTs}}</p>
      <!-- 解析 -->
      <div class="dtShiti_jx" v-show="isDtJxMain">
        <p>正确答案：<span>{{dtTrue}}</span>，解析：{{dtjx}}</p>
      </div>
      <div class="dtShiti_btn">
        <button @click="dtbtnAnalysis" :disabled="isDtJx" :class="dtJxClass">解析</button>
        <button @click="dtbtnNext" class="datiJxStop">换一题</button>
        <button @click="dtbtnSubmit" class="datiJxStop">结束</button>
      </div>
    </div>
  </div>
</template>

<script>
  import pops from '../../../components/pops.vue';
  import {mapState, mapActions, mapGetters} from 'vuex';
  export default {
    data() {
      return {
        isPops: false, //弹窗显示隐藏
        popsMessage: '', //弹窗内容
        errMassage: '', //请求失败提示
        dtModel: '',
      }
    },
    mounted() {
      this.axios({
        url: 'http://localhost:8081/static/json/dt/dt-vue.json',
        // url: 'http://172.20.10.3:8081/static/json/dt/dt-vue.json',
        // url: 'http://aqiu.dyfeiyu.com/static/json/dt/dt-vue.json',
        method: 'GET',
      }).then(res => {
        this.$store.commit('dtLoding', res.data.Vue);
      }).catch(err => {
        this.errMassage = '数据请求失败！'
        console.log(err)
      });
      // 初始禁止点击解析
      this.$store.commit('dtJxBtn', true);
    },
    computed: {
      ...mapState({
        dtType: state => state.dtTest.dtType,
        dtTitle: state => state.dtTest.dtTitle,
        dtId: state => state.dtTest.dtId,
        dtTs: state => state.dtTest.dtTs,
        dtOption: state => state.dtTest.dtOption,
        isDtJxMain: state => state.dtTest.isDtJxMain,
        dtTrue: state => state.dtTest.dtTrue,
        dtjx: state => state.dtTest.dtjx,
        dtJxClass: state => state.dtTest.dtJxClass,
        isDtJx: state => state.dtTest.isDtJx,
      })
    },
    methods: {
      // 获取当前选项的值
      dtRadioVal(value) {
        // 将id和选择的值放进对象中传过去
        let obj = {
          dtId: this.$store.state.dtTest.dtId,
          dtValue: value
        };
        // 触发选择事件后解析按钮可点击
        this.$store.commit('dtJxBtn', false);
        this.$store.commit('dtValues', obj);
      },
      // 解析
      dtbtnAnalysis() {
        this.$store.commit('dtAnswer', this.$store.state.dtTest.dtValue);
        this.$store.commit('dtAnalysis');
      },
      // 换一题
      dtbtnNext() {
        // 触发换一题事件后解析按钮不可点击
        this.$store.commit('dtJxBtn', true);
        this.$store.commit('dtAnswer', this.$store.state.dtTest.dtValue);
        this.$store.commit('dtNext');
      },
      // 结束
      dtbtnSubmit() {
        // 再执行一次存值，因为可能最后一次选择答案不会再点击下一题，就导致最后一次选择不存值
        this.$store.commit('dtAnswer', this.$store.state.dtTest.dtValue);
        // 统计得分&清空信息
        this.$store.commit('dtScores');
        /* let dtSumValue = this.$store.state.dtTest.dtSumValue;
        dtSumValue = JSON.stringify(dtSumValue);
        console.log("最终选择答案：  "+dtSumValue) */
        // 重置计时器
        this.$store.commit('reset');
         // 存取计时器时间
        this.$store.commit('toMinute');
        // 弹出提示框
        this.isPops = true;
        // 将提示内容传递到提示框内
        this.popsMessage = '提交成功!';
      },
      // 提示框取消按钮操作
      popsBtnFalse(data) {
        this.$router.replace('/index/xuexi/dati');
      },
      // 提示框确认按钮操作
      popsBtnTrue() {
        this.$router.replace('/index/xuexi/dati');
      }
    },
    components: {
      pops,
    }
  }
</script>

<style>
  .dtShiti {
    border: 0.02rem solid #999999;
    padding: 0.2rem;
    border-radius: 0.2rem;
    box-shadow: 0 0 0.1rem #999999;
  }

  .dtShiti_main {
    /* border: 1px solid red; */
  }

  .dtShiti_main h3 {
    font-size: 0.3rem;
    border-bottom: 0.02rem solid #ddd;
    padding-bottom: 0.05rem;
  }

  .dtShiti_content {
    /* border: 1px solid red; */
  }

  .dtShiti_content h5 {
    font-size: 0.3rem;
    margin: 0.1rem 0 0.2rem 0;
    font-weight: normal;
    color: #42B983;
  }

  .dtShiti_content input {
    width: 0.3rem;
    height: 0.3rem;
    float: left;
    margin: 0.06rem 0.1rem 0 0;
  }

  .dtShiti_content label {
    display: block;
    float: left;
    width: 6rem;
    font-size: 0.28rem;
    text-align: justify;
  }

  .dtShiti_content form>div {
    overflow: hidden;
    margin-top: 0.1rem;
  }

  .dtShiti_ts {
    width: 100%;
    text-align: center;
    font-size: 0.24rem;
    color: red;
    margin: 0.1rem 0;
  }
  .dtShiti_jx{
    margin: 0.2rem 0;
    font-size: 0.28ren;
    text-align: justify;
  }
  .dtShiti_jx span{
    color: red;
  }
  .dtShiti_btn {
    margin-top: 0.2rem;
    display: flex;
    width: 90%;
    padding: 0 5%;
    justify-content: space-around;
  }

  .dtShiti_btn button {
    width: 1.4rem;
    height: 0.6rem;
    line-height: 0.6rem;
    color: white;
    font-size: 0.28rem;
    border: none;
    border-radius: 0.1rem;
  }
  .datiJxStop{
     background-color: #42B983;
  }
  .datiJxPlay{
    background-color: #999999;
  }
</style>
