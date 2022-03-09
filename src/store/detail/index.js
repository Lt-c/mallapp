// home 模块的小仓库
import {
  reqGetGoodsInfo,
  reqAddOrUpadteShopCart
} from "@/api";
// 封装游客身份模块uuid ——生成一个随机字符串（生成一次即可
import { getUUID } from '@/utils/uuid_token'

const state = {
  goodInfo: {},
  // 游客临时身份
  uuid_token:getUUID()
};
const mutations = {
  GETGOODSINFO(state, goodInfo) {
    state.goodInfo = goodInfo.data
  },

};

const actions = {
  // 获取商品信息的action
  async getGoodsInfo({ commit }, skuId) {
    const result = await reqGetGoodsInfo(skuId);
    if (result.code == 200) {
      return commit('GETGOODSINFO', result)
    }
  },
  // 加入或者修改购物车中的商品
  async addOrUpadteShopCart({}, {skuId, skuNum}){
    // 加入购物车的返回的解构
    const result = await reqAddOrUpadteShopCart(skuId, skuNum);// 加入购物车后，前台带参数，发送请求
    if (result.code == 200){
      // console.log(result);
      // 服务器写入数据成功，但是没有返回code=200，告诉我们请求成功，并没有data，
      // 所以服务器没有返回数据，不需要三连环
      // commit('ADDORUPDATESHOPCART', result)
      // console.log(result);
      return 'ok'
    }else{
      // 加入购物车失败
      return Promise.reject(new Error('faile'));
    }
  }
};

const getters = {
  // 处理detail页面的面包屑
  categoryView(state){
    // 设置一个空对象，解决空报错的问题，如果不设置，数据请求没有返回时，会返回undefined，接收到数据后再更新数据
    return state.goodInfo.categoryView || {};
  },
  // 简化产品信息的数据，图、价格，标题
  skuInfo(state){
    return state.goodInfo.skuInfo || {};
  },
  // 简化售卖属性
  spuSaleAttrList(state){
    return state.goodInfo.spuSaleAttrList
  }
  
};

export default {
  state,
  mutations,
  actions,
  getters,
}