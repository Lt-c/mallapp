// // 引入组件
// import Home from '@/views/Home'
// import Search from '@/views/Search';
// import Login from '@/views/Login';
// import Register from '@/views/Register';
// import Detail from '@/views/Detail'
// import AddCartSuccess from '@/views/AddCartSuccess'
// import ShopCart from '@/views/ShopCart';
// import Trade from '@/views/Trade';
// import Pay from '@/views/Pay';
// import PaySuccess from '@/views/PaySuccess';
// import Center from '@/views/Center';
// // 引入二级路由组件
// import MyOrder from '@/views/Center/MyOrder';
// import GroupOrder from '@/views/Center/GroupOrder'
// 路由配置信息
export default [{
    path: '/home',
    component: ()=> import('@/views/Home'),
    // 路由元信息控制footer组件的显示与否，路由注册的组件都有自己不同的this.$route true为显示 false 为不显示
    meta: {
      isShow: true
    }
  },
  {
    // 使用params传参，需要占位
    // 面试题 1   如果路由要求传递 params 参数，但是不传，那么是会出现路径问题，即url问题 http://localhost:8080/#/?keyword=qwe
    // path: '/search/:keyword',
    // 指定paramas可传可不传递，给params参数后加 ? 如下就不会出现问题
    path: '/search/:keyword?',
    component: () => import('@/views/Search'),
    name: 'search',
    meta: {
      isShow: true
    },
  },
  {
    // params传递参数
    path: '/detail/:skuid',
    component: () => import('@/views/Detail'),
    meta: {
      isShow: true
    },
  },
  {
    path: '/login',
    component: () => import('@/views/Login'),
    meta: {
      isShow: false
    }
  },
  {
    path: '/register',
    component: () => import('@/views/Register'),
    meta: {
      isShow: false
    }
  },
  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: () => import('@/views/AddCartSuccess'),
    meta: {
      isShow: true
    },
  },
  {
    path: '/shopcart',
    name: 'shopcart',
    component: () => import('@/views/ShopCart'),
    meta: {
      isShow: true
    },
  },
  {
    path: '/trade',
    name: 'trade',
    component: () => import('@/views/Trade'),
    beforeEnter: (to, from ,next) => {
      if (from.path == '/shopcart'){
        next()
      } else {
        next(false) // 中断当前的导航，返回到原来的路由地址
      }
    },
    meta: {
      isShow: true
    },
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/views/Pay'),
    beforeEnter:(to, from ,next)=>{
      // console.log(from.path );
      if (from.path =='/trade'){
        next()
      } else {
        next(false)
      }
    },
    meta: {
      isShow: true
    },
  },
  {
    path: '/paysuccess',
    name: 'paysuccess',
    component: () => import('@/views/PaySuccess'),
    meta: {
      isShow: true
    },
  },
  {
    path: '/center',
    name: 'center',
    component: () => import('@/views/Center'),
    
    meta: {
      isShow: true
    },
    children: [{
        path: 'myorder',
        name: 'myorder',
        component: () => import('@/views/Center/MyOrder'),
      },
      {
        path: 'grouporder',
        name: 'grouporder',
        component: () => import('@/views/Center/GroupOrder'),
      },
      {
        path: '/center',
        redirect: '/center/myorder'
      }
    ]
  },

  // 重定向,当项目跑起来的时候，访问 / 目录，自动定向到首页
  {
    path: '*',
    redirect: '/home'
  },
  
]