// 此模块，API进行统一管理
import requests from "./request";
import mockRequests from "./mockRequest"
// 三级联动请求
// 接口 /api/product/getBaseCategoryList get 无参
export const reqCategoryList = () => requests({
  url: '/product/getBaseCategoryList'
});
// 分别暴露 在引用时 import { reqCategoryList } from '@/api'


// 获取banner （home组件首页轮播图）
export const reqGetBannerList = () => mockRequests.get('/banner')

// 获取floors数据
export const reqGetFloorsList = () => mockRequests.get('/floors')

// 获取搜索模块数据 /api/list 请求方式 : post 需要携带参数 
export const reqGetSearchInfo = (params) => requests({
  url: '/list',
  method: 'post',
  data: params, // 给服务器传递参数，params 至少是一个空对象,在vuex中已经默认设置为了一个对象
})

// 获取产品信息的借口 /api/item/{skuId} 请求方式 ：get 
export const reqGetGoodsInfo = (skuId) => requests({
  url: `/item/${skuId}`,
  method: 'get',
})

// 将产品加入到购物车中，（获取更新某一个产品的个数） /api/cart/addToCart/{ skuId }/{ skuNum } 请求方式 post
export const reqAddOrUpadteShopCart = (skuId, skuNum) => requests({
  url: `/cart/addToCart/${skuId}/${skuNum}`,
  method: 'post',
})

// 获取购物车列表，/api/cart/cartList GET
export const reqShopCartList = () => requests({
  url: `/cart/cartList`,
  method: 'get',
})

// 删除购物车中的商品 /api/cart/deleteCart/{skuId}   DELETE
export const reqRemoveCarGood = (skuId) => requests({
  url: `/cart/deleteCart/${skuId}`,
  method: 'delete'
})

// 修改商品选中状态 /api/cart/checkCart/{skuId}/{isChecked}   GET
export const reqUpdateCheckedById = (skuId, isChecked) => requests({
  url: `/cart/checkCart/${skuId}/${isChecked}`,
  method: 'get'
})

// 获取验证码  /api/user/passport/sendCode/{phone}    get
export const reqGetCode = (phone) => requests({
  url: `/user/passport/sendCode/${phone}`,
  method: 'get'
})
// 注册账号  /api/user/passport/register{code,phone,password}   post
export const reqUserRegister = (data) => requests({
  url: `/user/passport/register`,
  data,
  method: 'post'
})

// 登陆接口 /api/user/passport/login   post 传递一个对象
export const reqUserLogin = (data) => requests({
  url: `/user/passport/login`,
  data,
  method: 'post'
})

// 获取用户的信息【需要带上用户的token发起请求】  /api/user/passport/auth/getUserInfo   get
export const reqUserInfo = () => requests({
  url: `/user/passport/auth/getUserInfo`,
  method: 'get'
})


// 退出登录 /api/user/passport/logout  get
export const reqLogout = () => requests({
  url: `/user/passport/logout`,
  method: 'get'
})

// 获取订单交易页信息 /api/order/auth/trade   get
export const reqTradeList = () => requests({
  url: `/order/auth/trade`,
  method: 'get'
})
// 获取用户地址信息 /api/user/userAddress/auth/findUserAddressList  get
export const reqAddressInfo = () => requests({
  url: `/user/userAddress/auth/findUserAddressList`,
  method: 'get'
})


// 提交订单   /api/order/auth/submitOrder?tradeNo={tradeNo}  post
export const reqSubmitOrder = (tradeNo, data) => requests({
  url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
  method:'post',
  data,
})

// 获取订单支付信息 /api/payment/weixin/createNative/{orderId} get
export const reqPayInfo = (orderId) => requests({
  url:`/payment/weixin/createNative/${orderId}`,
  method:'get'
})

// 获取订单支付状态  /api/payment/weixin/queryPayStatus/{orderId}   get
export const reqPayStatus = (orderId) => requests({
  url:`/payment/weixin/queryPayStatus/${orderId}`,
  method:'get'
})

// 获取我的订单列表 /api/order/auth/{page}/{limit}   GET
export const reqMyOrderList = (page,limit) =>requests({
  url:`/order/auth/${page}/${limit}`,
  method:'get'
})

