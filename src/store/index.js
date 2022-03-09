import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
// 引入小仓库
import home from './home';
import search from './search';
import detail from './detail';
import shopcart from './shopcart';
import user from './user';
import trade from './trade';
// // 数据存储的位置
// const state = {};
// // 修改数据的唯一手段
// const mutations = {};
// // 处理actions可以书写自己的业务逻辑，也可以处理异步
// const actions = {};
// // getters类似于组件中的computed，用于简化仓库数据，让组件获取仓库的数据，更加方便
// const getters = {};
// 对外暴露Store类的一个实例
export default new Vuex.Store({
  // 实现vuex仓库模块式开发存储数据
  modules:{
    home,
    search,
    detail,
    shopcart,
    user,
    trade
  }
})