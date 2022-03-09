// home 模块的小仓库
import { reqCategoryList, reqGetBannerList, reqGetFloorsList } from "@/api";
// category
const state = {
  // 需要在state中提前准备好一个起始值,类型和请求回来数据一样
  categroyList: [],
  bannerList: [],
  floorsList:[]
};
const mutations = {
  CATEGORYLIST(state, categoryList) {
    // 传入的第一个数据，是state中的内容， 第二个是actions 中对应函数传递的内容
    // 修改数据
    categoryList.data.length = 16;
    state.categroyList = categoryList.data
    // console.log(state.categroyList)
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList.data;
    // console.log(state.bannerList)
  },
  GETFLOORSLIST(state, floorsList){
    state.floorsList = floorsList.data;
  }
};

const actions = {
  // 通过api中的接口函数调用，向服务器发送请求。获取服务器的数据
  async getCategory({ commit }) { // 使用结构结构赋值，把默认传递参数中的commit方法取出来
    const result = await reqCategoryList();
    if (result.code) {
      commit('CATEGORYLIST', result);
      // console.log(result)
    }
  },
  // 获取首页轮播图的数据
  async getBannerList({ commit }) {
    const result = await reqGetBannerList();
    if (result.code) {
      commit('GETBANNERLIST', result)
    }
  },
  // 获取floors数据
  async getFloorsList ({ commit } ){
    const result = await reqGetFloorsList();
    if ( result.code ) {
      commit('GETFLOORSLIST', result)
    }
  }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
}