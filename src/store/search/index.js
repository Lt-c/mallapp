// search 模块的小仓库
import {
  reqGetSearchInfo
} from '@/api';
// 数据存储的位置
const state = {
  searchInfo:{}
};
// 修改数据的唯一手段
const mutations = {
  GETSEARCHINFO(state,searchInfo){
    searchInfo.data.trademarkList.shift()
    state.searchInfo = searchInfo.data
  }
};
// 处理actions可以书写自己的业务逻辑，也可以处理异步
const actions = {
  // 获取search模块数据
  async getSearchInfo({ commit },params = {}) {
    // params形参，是dispatch派发actions的第二个参数，至少是一个空对象
    const result = await reqGetSearchInfo(params)
    if (result.code == 200) {
      commit('GETSEARCHINFO',result)
    }
  }
};
// getters类似于组件中的computed，用于简化仓库数据，让组件获取仓库的数据，更加方便
const getters = {
  goodsList:state=>{
    return state.searchInfo.goodsList;// 问题
  },
  attrsList:state=>{
    return state.searchInfo.attrsList;
  },
  trademarkList:state=>{
    // state.searchInfo.trademarkList.shift()
    return state.searchInfo.trademarkList;
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
}