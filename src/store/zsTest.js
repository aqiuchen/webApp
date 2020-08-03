export default{
  state:{
    zsBtn: '开始积累',
    isZsbtn: false,
    zsBtnClass: {
      zhishiPlay: false,
      zhishiStop: true,
    },
    zsTs: '',
    zsList: [],
    zsId: '',
    zsTitle: '',
    zsTrue: '',
  },
  mutations: {
    // 开始积累
    zsPlay(state){
      state.isZsbtn = true;
      state.zsBtnClass.zhishiPlay = true;
      state.zsBtnClass.zhishiStop = false;
      state.zsBtn = '正在充能';
      state.zsTs = '';
    },
    // 初始载入
    zsLoding(state, obj){
      state.zsList = obj;
      state.zsId = obj[0].zsId;
      state.zsTitle = obj[0].zsTitle;
      state.zsTrue = obj[0].zsTrue;
    },
    // 下一个
    zsNext(state){
      for(let i in state.zsList){
        if(state.zsId == state.zsList[i].zsId){
          i++;
          if(i == state.zsList.length){
            state.zsTs = '已经是最后一题了！';
          }else{
            state.zsId = state.zsList[i].zsId;
            state.zsTitle = state.zsList[i].zsTitle;
            state.zsTrue = state.zsList[i].zsTrue;
            state.zsTs = '';
            return;
          }
        }
      }
    },
    // 结束
    zsOver(state){
      // 控制开始按钮操作
      state.isZsbtn = false;
      state.zsBtnClass.zhishiPlay = false;
      state.zsBtnClass.zhishiStop = true;
      state.zsBtn = '开始积累';
    }
  }
}
