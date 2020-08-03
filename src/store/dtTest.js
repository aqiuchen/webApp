export default{
  state:{
    isDtResult: false,  //隐藏答题结果
    dtBtn: '开始答题',
    isDtbtn: false,
    dtBtnClass: {
      datiPlay: false,
      datiStop: true,
    },
    dtType: '',
    dtId: '',
    dtTitle: '',
    dtOption: [], //选项列表
    isDtJx: true, //禁止解析按钮点击
    dtJxClass: {  //解析按钮样式
      datiJxPlay: true,
      datiJxStop: false,
    },
    dtList: [], //所有题汇总
    dtTs: '', //试题提示
    isDtJxMain: false, //答题解析内容隐藏
    dtTrue: '', //正确答案
    dtjx: '', //答案解析
    dtSumValue: [], //所有试题选择答案汇总
    dtValue: [],  //存放当前题选择的答案
    dtTrueList: 0,  //正确答题数
    dtFalseList: 0,  //错误答题数
    dtNoList: 0,  //未答题数
    dtScore: 0,  //考试得分
  },
  mutations: {
    // 开始答题
    dtPlay(state){
      // 清空所有试题和答题信息
      state.dtOption = [];
      state.dtList = [];
      state.dtTs = '';
      state.dtSumValue = [];
      state.dtValue = [];
      state.dtModels = '';
      state.dtTrueList = 0;
      state.dtFalseList = 0;
      state.dtNoList = 0;
      state.dtScore = 0;
      state.isDtResult = false;
      state.isDtbtn = true;
      state.dtBtnClass.datiPlay = true;
      state.dtBtnClass.datiStop = false;
      state.dtBtn = '正在答题';
      state.isDtJxMain = false;
    },
    // 初始载入试题
    dtLoding(state, obj){
      state.dtList = obj;
      state.dtType = obj[0].dtType;
      state.dtId = obj[0].dtId;
      state.dtTitle = obj[0].dtTitle;
      state.dtOption = obj[0].dtOption;
    },
    // 控制答题解析按钮
    dtJxBtn(state, value){
      state.isDtJx = value;
      state.dtJxClass.datiJxPlay = value;
      state.dtJxClass.datiJxStop = !value;
    },
    // 存放当前题选择的答案
    dtValues(state, value){
      state.dtValue = value;
    },
    // 存放所有试题选择答案
    dtAnswer(state, value){
      if(state.dtSumValue.length == 0){
        state.dtSumValue.push(value);
      }else{
        // 判断dtValue是否有重复dtId，不重复则传入，重复则替换dtValue值");
        for(let i in state.dtSumValue){
          // 如果新传入的dtId在存入的值中已存在，则替换值
          if(state.dtSumValue[i].dtId == value.dtId){
            state.dtSumValue[i].dtValue = value.dtValue;
          }else{
            // 不存在重复，直接push
            state.dtSumValue.push(value);
          }
        }
      }
      // 数组去重
      state.dtSumValue = Array.from(new Set(state.dtSumValue));
      this.commit('qcs');
    },
    // 解析
    dtAnalysis(state){
      state.isDtJxMain = true;
      this.commit('dtJxBtn', true);
      for(let i in state.dtList){
        if(state.dtValue.dtId == state.dtList[i].dtId){
          // 将正确答案和解析传进来
          state.dtTrue = state.dtList[i].dtTrue;
          state.dtjx = state.dtList[i].dtjx;
          // 取首字符串
          let dtValue = state.dtValue.dtValue.charAt(0);
          if(dtValue == state.dtList[i].dtTrue){
            state.dtTs = '回答正确！';
          }else{
            state.dtTs = '回答错误！';
          }
        }
      }
    },
    // 换一题
    dtNext(state){
      state.isDtJxMain = false;
      for(let i in state.dtList){
        if(state.dtId == state.dtList[i].dtId){
          i++;
          if(i == state.dtList.length){
            state.dtTs = '已经是最后一题了！';
          }else{
            state.dtType = state.dtList[i].dtType;
            state.dtId = state.dtList[i].dtId;
            state.dtTitle = state.dtList[i].dtTitle;
            state.dtOption = state.dtList[i].dtOption;
            state.dtTs = '';
            return;
          }
        }
      }
    },
    // 数组去重
    qcs(state){
      for(let i=0; i<state.dtSumValue.length; i++){
        for(let j=i+1; j<state.dtSumValue.length; j++){
          if(state.dtSumValue[i].dtId === state.dtSumValue[j].dtId){
            state.dtSumValue.splice(i,1)
          }
        }
      }
    },
    // 交卷后操作- 计算得分&清空信息
    dtScores(state){
      for(let i in state.dtSumValue){
        for(let j in state.dtList){
          if(state.dtSumValue[i].dtId == state.dtList[j].dtId){
            // 获取字符串首字符
            let dtValue = state.dtSumValue[i].dtValue.charAt(0);
            if(dtValue == state.dtList[j].dtTrue){
              state.dtTrueList++;
            }else{
              state.dtFalseList++;
            }
          }
        }
      }
      // 计算得分
      state.dtScore = state.dtTrueList*2 + state.dtFalseList*0;
      state.dtNoList = state.dtList.length - state.dtTrueList - state.dtFalseList;
      // 控制考试按钮操作
      state.isDtbtn = false;
      state.dtBtnClass.datiPlay = false;
      state.dtBtnClass.datiStop = true;
      state.dtBtn = '开始答题';
      // 显示考试结果
      state.isDtResult = true;
    }
  }
}
