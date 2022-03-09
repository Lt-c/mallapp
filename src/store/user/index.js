// 登陆 与注册的仓库
import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqLogout
} from '@/api'

const state = {
  code: '',
  token:localStorage.getItem('TOKEN'),
  userInfo:{}
};
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state,token){
    state.token = token
  },
  GETUSERINFO(state,userInfo){
    state.userInfo = userInfo
  },
  USERLOGOUT(state){
    // 把仓库中的相关数据清空，本地存储数据清空
    state.token = '';
    state.userInfo = {};
    localStorage.removeItem('TOKEN')
  }
};
const actions = {
  // 获取验证码
  // eslint-disable-next-line no-unused-vars
  async getCode({ commit }, phone) {
    const result = await reqGetCode(phone);
    if (result.code == 200) {
      // console.log(result);
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 注册账号
  async userRegister({commit},user){
    const result = await reqUserRegister(user)
    if (result.code == 200){
      // console.log(result);
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }

  },
  // 登陆账号
  async userLogin({commit},data){
    const result = await reqUserLogin(data);
    // 服务器下发token，用户唯一标识
    // 以后经常通过带有token的请求，向服务器请求数据
    if(result.code == 200){
      // console.log(result);
      // 用户登录成功且已经获取到token
      commit('USERLOGIN', result.data.token)
      // 持久化存储token
      localStorage.setItem('TOKEN', result.data.token)

      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 获取用户信息
  async getUserInfo({commit}){
    const result = await reqUserInfo()
    if (result.code == 200){
      console.log('发起用户请求');
      commit('GETUSERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 退出登录
  async userLogout({commit}){
    // 发起请求 ，只是通知服务器清除该用户token
    const result = await reqLogout();
    if (result.code == 200){
      commit('USERLOGOUT');
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
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