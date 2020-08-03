export default {
  state: {
    musicImg: '', //播放音乐的封面
    musicTitle: '', //播放音乐的名字
    musicId: '', //播放音乐的id
    musicFrom: '', //歌曲路径
    musicStop: true, //底部暂停播放按钮显示隐藏
    musicPlay: false, //底部开始播放按钮显示隐藏
    musicThis: [], //播放当前歌曲信息
    musicList: [], //所有歌曲信息
    isbtnPlay: false,
    isbtnStop: true,
		isanimationMusic: false,
		istransformMusic: false,
		
  },
  mutations: {
    // 底部固定div显示隐藏
    btnShows(state, value) {
      state.btnShow = value
    },
    // 获取所有歌曲信息
    musicList(state, value) {
      state.musicList = value
    },
    // 播放音乐传值
    playMusic(state, object) {
      state.musicThis = object;
      state.musicImg = object.tjgqImg;
      state.musicTitle = object.tjgqTitle;
      state.musicId = object.tjgqId;
      state.musicStop = object.isbtnStop;
      state.musicPlay = object.isbtnPlay;
      state.musicFrom = object.tjgqFrom;
    },
    // 列表播放歌曲
    bfMusic(state, index) {
      state.musicPlay = !state.musicList[index].isbtnPlay;
      state.musicStop = !state.musicList[index].isbtnStop;
      let data = state.musicList;
      for (let i in data) {
        if (data[i].tjgqId === state.musicId) {
          state.musicPlay = !data[index].isbtnPlay;
          state.musicStop = !data[index].isbtnStop;
          data[index].isbtnPlay = state.musicPlay;
          data[index].isbtnStop = state.musicStop;
        } else {
          data[i].isbtnPlay = false;
          data[i].isbtnStop = true;
        }
      }
    },
    // 底部组件播放按钮控制
    btnMusic(state) {
      state.musicPlay = !state.musicPlay;
      state.musicStop = !state.musicStop;
      let data = state.musicList;
      for (let i in data) {
        if (data[i].tjgqId === state.musicId) {
          state.musicPlay = !data[i].isbtnPlay;
          state.musicStop = !data[i].isbtnStop;
          data[i].isbtnPlay = state.musicPlay;
          data[i].isbtnStop = state.musicStop;
        } else {
          data[i].isbtnPlay = false;
          data[i].isbtnStop = true;
        }
      };
    },
    // 底部组件上一曲
    beforeMusic(state) {
      state.musicPlay = true;
      state.musicStop = false;
      let data = state.musicList;
      for (let i in data) {
        if (data[i].tjgqId === state.musicId) {
          data[i].isbtnPlay = false;
          data[i].isbtnStop = true;
          if (i == 0) {
            i = data.length - 1;
            data[i].isbtnPlay = true;
            data[i].isbtnStop = false;
            state.musicImg = data[i].tjgqImg;
            state.musicTitle = data[i].tjgqTitle;
            state.musicId = data[i].tjgqId;
            state.musicFrom = data[i].tjgqFrom;
            return;
          } else {
            i--;
            data[i].isbtnPlay = true;
            data[i].isbtnStop = false;
            state.musicImg = data[i].tjgqImg;
            state.musicTitle = data[i].tjgqTitle;
            state.musicId = data[i].tjgqId;
            state.musicFrom = data[i].tjgqFrom;
          }
        }
      }
    },
    // 底部组件下一曲
    afterMusic(state) {
      state.musicPlay = true;
      state.musicStop = false;
      let data = state.musicList;
      for (let i in data) {
        if (data[i].tjgqId === state.musicId) {
          data[i].isbtnPlay = false;
          data[i].isbtnStop = true;
          if (i == data.length - 1) {
            i = 0;
            data[i].isbtnPlay = true;
            data[i].isbtnStop = false;
            state.musicImg = data[i].tjgqImg;
            state.musicTitle = data[i].tjgqTitle;
            state.musicId = data[i].tjgqId;
            state.musicFrom = data[i].tjgqFrom;
          } else {
            i++;
            data[i].isbtnPlay = true;
            data[i].isbtnStop = false;
            state.musicImg = data[i].tjgqImg;
            state.musicTitle = data[i].tjgqTitle;
            state.musicId = data[i].tjgqId;
            state.musicFrom = data[i].tjgqFrom;
            return;
          }
        }
      }
    },
    // 歌曲名字滚动
    musicTitle(state) {
      if (state.musicPlay) {
        // 添加css动画
        state.isanimationMusic = true;
        state.istransformMusic = true;
      } else {
        state.isanimationMusic = false;
        state.istransformMusic = false;
      }
    },
    // 播放完自动播放下一首
    lastMusic(state) {
			let musicId = state.musicId;
			for(let i=0; i<state.musicList.length; i++){
				if (musicId === state.musicList[i].tjgqId) {
				  state.musicList[i].isbtnPlay = false;
				  state.musicList[i].isbtnStop = true;
				  if (i == state.musicList.length - 1) {
				    state.musicImg = state.musicList[0].tjgqImg;
				    state.musicTitle = state.musicList[0].tjgqTitle;
				    state.musicId = state.musicList[0].tjgqId;
				    state.musicFrom = state.musicList[0].tjgqFrom;
				    state.musicList[0].isbtnPlay = true;
				    state.musicList[0].isbtnStop = false;
				  } else {
				    let j = i+1;
				    state.musicImg = state.musicList[j].tjgqImg;
				    state.musicTitle = state.musicList[j].tjgqTitle;
				    state.musicFrom = state.musicList[j].tjgqFrom;
				    state.musicId = state.musicList[j].tjgqId;
				    state.musicList[j].isbtnPlay = true;
				    state.musicList[j].isbtnStop = false;
				  }
				}
			}
      for (let i in state.musicList) {
				// console.log(i);
				// console.log('i的类型',typeof(i))
        /* if (state.musicId === state.musicList[i].tjgqId) {
					console.log('当前播放音乐ID',state.musicId)
          state.musicList[i].isbtnPlay = false;
          state.musicList[i].isbtnStop = true;
          if (i == state.musicList.length - 1) {
            state.musicImg = state.musicList[0].tjgqImg;
            state.musicTitle = state.musicList[0].tjgqTitle;
            state.musicId = state.musicList[0].tjgqId;
            state.musicFrom = state.musicList[0].tjgqFrom;
            state.musicList[0].isbtnPlay = true;
            state.musicList[0].isbtnStop = false;
          } else {
            let j = parseInt(i)+1;
            console.log('j=',j)
            console.log('下一首播放音乐ID',state.musicList[j].tjgqId)
            state.musicImg = state.musicList[j].tjgqImg;
            state.musicTitle = state.musicList[j].tjgqTitle;
            state.musicFrom = state.musicList[j].tjgqFrom;
            console.log('歌曲路径为：',state.musicFrom);
            state.musicId = state.musicList[j].tjgqId;
            state.musicList[j].isbtnPlay = true;
            state.musicList[j].isbtnStop = false;
            return;
          } 
        }*/
      }
    }
  }
}
