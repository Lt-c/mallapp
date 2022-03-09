// 配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';
// 使用插件
Vue.use(VueRouter); { //已经移入routes中
  // 引入组件
  // import Home from '@/views/Home'
  // import Search from '@/views/Search';
  // import Login from '@/views/Login';
  // import Register from '@/views/Register';
  // import Detail from '@/views/Detail'
}
// 引入store
import store from '@/store'


// 重写 VueRouter 的push方法
// 保存一个 VueRouter 原型对象的push
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push|replace    实质上 是对原有push|replace方法的简单加工
// 第一个参数 告诉原来的push | replace跳转位置
// 第二个参数 成功的回调
// 第三个参数 失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
  // 判断是否传递了resolve,reject
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  // 判断是否传递了resolve,reject
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => {}, () => {})
  }
}

import routes from './routes';
// 配置路由
let router = new VueRouter({
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    // y：0表示最顶部
    return {
      y: 0
    }
  }

  //以下已经移入routes中
  // 配置信息
  // routes: [{
  //     path: '/home',
  //     component: Home,
  //     // 路由元信息控制footer组件的显示与否，路由注册的组件都有自己不同的this.$route true为显示 false 为不显示
  //     meta: {
  //       isShow: true
  //     }
  //   },
  //   {
  //     // 使用params传参，需要占位
  //     // 面试题 1   如果路由要求传递 params 参数，但是不传，那么是会出现路径问题，即url问题 http://localhost:8080/#/?keyword=qwe
  //     // path: '/search/:keyword',
  //     // 指定paramas可传可不传递，给params参数后加 ? 如下就不会出现问题
  //     path: '/search/:keyword?',
  //     component: Search,
  //     name: 'search',
  //     meta: {
  //       isShow: true
  //     },
  //     // 路由组件传递props传递数据，使用都很少，面试用
  //     // 布尔值写法：params
  //     // props: true // 此时跳转到search组件时，会出现 $attrs 接收params的参数
  //     // 对象写法
  //     // props:{a:1,b:2} //此时跳转到search组件时，会出现 $props
  //     // 函数的写法
  //     // props:($route)=>{
  //     //   return {keyword:$route.params.keyword ,k:$route.query.keyword,a:2}
  //     // }
  //     //此时跳转到search组件时，会出现 $props 和 $attrs

  //   },
  //   {
  //     // params传递参数
  //     path:'/detail/:skuid',
  //     component:Detail,
  //     meta: {
  //       isShow: true
  //     },
  //   },
  //   {
  //     path: '/login',
  //     component: Login,
  //     meta: {
  //       isShow: false
  //     }
  //   },
  //   {
  //     path: '/register',
  //     component: Register,
  //     meta: {
  //       isShow: false
  //     }
  //   },

  //   // 重定向,当项目跑起来的时候，访问 / 目录，自动定向到首页
  //   {
  //     path: '*',
  //     redirect: '/home'
  //   }
  // ]

})
// 全局守卫：前置守卫(路由跳转前进行判断)
router.beforeEach(async (to, from, next) => {
  // to 获取你要跳转的路径的信息
  // from 获取你从什么哪个路由而来
  // next 是一个放行的函数 有多个写法
  // 1、next()放行  2、next('/login') 放行到指定路由组件  3、 next(false)
  // console.log('to:' , to);
  // console.log('from:' , from);
  // console.log('next:' , next);
  // next()
  // 用户登录后就会有token
  let token = store.state.user.token;
  // 用户信息
  let name = store.state.user.userInfo.name;
  // console.log(token);
  if (token) {
    // 用户登录后，就不能再访问login页面，返回首页
    if (to.path == '/login' || to.path == '/register') {
      next('/home')
    } else {
      // 登录，但去的不是login页面
      // 判断是否有用户名
      if (name) {
        next()
      } else {
        // 没有用户信息，就需要派发actions ，让仓库存储用户信息
        try {
          // 获取用户信息
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // 一种情况，验证token过期失效，获取不到用户的信息
          // 此时需要清除原有的token和用户信息，逻辑和logout一样
          // 跳转到login
          await store.dispatch('userLogout');
          next('/login')
        }
      }
      // next()
    }
  } else {
    // 未登录不能去的界面 交易 支付 个人中心【pay paysuccess center】
    // 未登录点击以上页面，应该跳转到登录活注册页面
    let toPath = to.path;
    if (toPath == '/trade' || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
      next('/login?redircet=' + toPath)
    } else {
      // 去的是home search shopcart 放行
      next()
    }

    // next()
  }
})
export default router