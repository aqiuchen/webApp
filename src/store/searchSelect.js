export default {
  state: {
    lists: ["中国建设银行","中国工商银行","中国农业银行","招商银行","天府银行","天地银行","招商银行","光大银行","华夏银行","陈阿秋",
    "攀枝花商业银行","中国邮政储蓄银行","四川农村信用社","农商银行","成都银行","贵阳银行","包商银行","浙商银行","重庆银行","北京银行",
    "上海银行","绵阳商行","南充商行","民生银行","中国银行","成都交投","四川交投","四川城投","成都新希望集团","南充南运集团","南充交投",
    "南充城建","九湾科技","九湾航天","九湾金融","九湾军工","九湾云","九湾建设","南宁城建","中央金融","中东石油","九九归一","九五之尊"],
    inputVal: '',//输入的值
    selects: [],//匹配到的值
    clickVal:'',//存放选中的值
    isList: false,//隐藏下拉框
  },
  mutations: {
    //获取输入的投资人信息
    getInputVal(state, value){
      state.inputVal = value;
    },
    // 正则查找
    regSearch(state){
      let newArry = [];
      let reg = new RegExp(state.inputVal);
      if(state.inputVal != ''){
        for(let i in state.lists){
          if(state.lists[i].match(reg)){
            newArry.push(state.lists[i]);
          }
        }
      }else{
        state.isList = false;
      }
      state.selects = newArry;
      if(state.selects != ''){
        state.isList = true;
      }
    },
    // 获取选中的值
    getClickVal(state, value){
      state.clickVal = value;
      state.inputVal = value;
      state.isList = false;
    },
    // 改变isList的属性
    setIsList(state, value){
      state.isList = value;
    }
  }
}
