// home 模块的小仓库
import {
  reqShopCartList,
  reqRemoveCarGood,
  reqUpdateCheckedById
} from "@/api";

const state = {
  cartList: []
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList.data;
  }

};

const actions = {
  // 获取购物车列表列表数据
  async getCartList({
    commit
  }) {
    const result = await reqShopCartList()
    if (result.code == 200) {
      commit("GETCARTLIST", result)
      // console.log(result);
    }
  },
  // 删除购物车中的商品，
  // eslint-disable-next-line no-empty-pattern
  async removeCartGoods({}, {skuId}) {
    const result = await reqRemoveCarGood(skuId);
    // console.log(skuId,result);
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile1'))
    }
  },
  // 删除购物车中勾选的商品 ，需要使用仓库中已经写好的action
  deleteAllCheckedCart({ dispatch, getters }) {
    // console.log(context);// 可以理解为小仓库，上面有commit【提交mutation】 ，dispatch【派发actions】，getters【计算属性】，state，当前仓库
    // 获取购物车中的全部产品（是一个数组
    const promiseAll = [];
    getters.cartList.cartInfoList.forEach(item => {
      if (item.isChecked == '1') {
        let promise = dispatch('removeCartGoods', {skuId: item.skuId })
        promiseAll.push(promise)
      }
      return Promise.all(promiseAll)
      // console.log(item.isChecked,item.skuId);
    });
  },
  // 修改购物车产品的选中状态
  // eslint-disable-next-line no-empty-pattern
  async updateCheckedById({}, {skuId, isChecked}) {
    const result = await reqUpdateCheckedById(skuId, isChecked);
    // console.log(result);
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 修改购物车全选和全不选
  updateAllCheckedCart({dispatch, state},isChecked){
    let promiseAll = [];
    // console.log('updateAllCheckedCart',isChecked);
    state.cartList[0].cartInfoList.forEach(item =>{
      let promise = dispatch('updateCheckedById',{skuId:item.skuId, isChecked:isChecked})
      promiseAll.push(promise)
    });
    // 最终返回结果
    return Promise.all(promiseAll)
    
  }

};

const getters = {
  cartList() {
    return state.cartList[0] || [];
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
}