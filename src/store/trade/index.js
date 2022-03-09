// 登陆 与注册的仓库
import {
  reqTradeList, 
  reqAddressInfo
} from '@/api'

const state = {
  addres: [],
  tradeList:{}
};
const mutations = {
  GETADDRESSINFO(state, addres) {
    state.addres = addres
  },
  GETTRADELIST(state, tradeList) {
    state.tradeList = tradeList
  }
};
const actions = {
  // 获取用户地址信息
  async getAddressInfo({commit}){
    const result = await reqAddressInfo();
    if (result.code == 200){
      // console.log(result);
      commit('GETADDRESSINFO', result.data)
    }
  },
  // 获取交易页面信息
  async getTradeList({commit}){
    const result =  await reqTradeList();
    if (result.code == 200) {
      commit('GETTRADELIST', result.data)
    }
  }
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters
}