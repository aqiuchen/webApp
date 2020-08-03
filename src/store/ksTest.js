export default{
  state:{
    isKsResult: false,  //隐藏考试结果
    ksBtn: '开始考试',
    isKsbtn: false,
    ksBtnClass: {
      kaoshiPlay: false,
      kaoshiStop: true,
    },
    ksType: '',
    ksId: '',
    ksTitle: '',
    ksOption: [], //选项列表
    ksList: [], //所有题汇总
    ksTs: '', //试题提示
    ksSumValue: [], //所有试题选择答案汇总
    ksValue: [],  //存放当前题选择的答案
    ksModels: '',  //存放model值回显选中状态
    ksTrueList: 0,  //正确答题数
    ksFalseList: 0,  //错误答题数
    ksNoList: 0,  //未答题数
    ksScore: 0,  //考试得分
  },
  mutations: {
    // 开始考试
    ksPlay(state){
      // 清空所有试题和考试信息
      state.ksOption = [];
      state.ksList = [];
      state.ksTs = '';
      state.ksSumValue = [];
      state.ksValue = [];
      state.ksModels = '';
      state.ksTrueList = 0;
      state.ksFalseList = 0;
      state.ksNoList = 0;
      state.ksScore = 0;
      state.isKsResult = false;
      state.isKsbtn = true;
      state.ksBtnClass.kaoshiPlay = true;
      state.ksBtnClass.kaoshiStop = false;
      state.ksBtn = '正在考试';
    },
    // 初始载入试题
    ksLoding(state, obj){
      state.ksList = obj;
      state.ksType = obj[0].ksType;
      state.ksId = obj[0].ksId;
      state.ksTitle = obj[0].ksTitle;
      state.ksOption = obj[0].ksOption;
    },
    // 存放当前题选择的答案
    ksValues(state, value){
      state.ksValue = value;
    },
    // 存放所有试题选择答案
    ksAnswer(state, value){
      if(state.ksSumValue.length == 0){
        state.ksSumValue.push(value);
      }else{
        // 判断ksValue是否有重复ksId，不重复则传入，重复则替换ksValue值");
        for(let i in state.ksSumValue){
          // 如果新传入的ksId在存入的值中已存在，则替换值
          if(state.ksSumValue[i].ksId == value.ksId){
            state.ksSumValue[i].ksValue = value.ksValue;
          }else{
            // 不存在重复，直接push
            state.ksSumValue.push(value);
          }
        }
      }
      // 数组去重
      state.ksSumValue = Array.from(new Set(state.ksSumValue));
      this.commit('qc');
    },
    // 上一题
    ksLast(state){
      for(let i in state.ksList){
        if(state.ksId == state.ksList[i].ksId){
          if(i == 0){
            state.ksTs = '已经是第一题了！';
            this.commit('returnModel');
          }else{
            i--;
            state.ksType = state.ksList[i].ksType;
            state.ksId = state.ksList[i].ksId;
            state.ksTitle = state.ksList[i].ksTitle;
            state.ksOption = state.ksList[i].ksOption;
            state.ksTs = '';
            // 如果已选择，则回显选中状态
            this.commit('returnModel');
          }
        }
      }
    },
    // 下一题
    ksNext(state){
      for(let i in state.ksList){
        if(state.ksId == state.ksList[i].ksId){
          i++;
          if(i == state.ksList.length){
            state.ksTs = '已经是最后一题了！';
            this.commit('returnModel');
          }else{
            state.ksType = state.ksList[i].ksType;
            state.ksId = state.ksList[i].ksId;
            state.ksTitle = state.ksList[i].ksTitle;
            state.ksOption = state.ksList[i].ksOption;
            state.ksTs = '';
            // 如果已选择，则回显选中状态
            this.commit('returnModel');
            return;
          }
        }
      }
    },
    // 数组去重
    qc(state){
      for(let i=0; i<state.ksSumValue.length; i++){
        for(let j=i+1; j<state.ksSumValue.length; j++){
          if(state.ksSumValue[i].ksId === state.ksSumValue[j].ksId){
            state.ksSumValue.splice(i,1)
          }
        }
      }
    },
    // 回显选中状态
    returnModel(state){
      if(state.ksSumValue != ''){
        for(let i in state.ksSumValue){
          if(state.ksId == state.ksSumValue[i].ksId){
            state.ksModels = state.ksSumValue[i].ksValue;
          }
        }
      }
    },
    // 交卷后操作- 计算得分&清空信息
    ksScores(state){
      for(let i in state.ksSumValue){
        for(let j in state.ksList){
          if(state.ksSumValue[i].ksId == state.ksList[j].ksId){
            // 获取字符串首字符
            let ksValue = state.ksSumValue[i].ksValue.charAt(0);
            if(ksValue == state.ksList[j].ksTrue){
              state.ksTrueList++;
            }else{
              state.ksFalseList++;
            }
          }
        }
      }
      // 计算得分
      state.ksScore = state.ksTrueList*2 + state.ksFalseList*0;
      state.ksNoList = state.ksList.length - state.ksTrueList - state.ksFalseList;
      // 控制考试按钮操作
      state.isKsbtn = false;
      state.ksBtnClass.kaoshiPlay = false;
      state.ksBtnClass.kaoshiStop = true;
      state.ksBtn = '开始考试';
      // 显示考试结果
      state.isKsResult = true;
    }
  }
}
