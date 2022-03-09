import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 引入Vuex 
import store from './store';
// 引入全局组件
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination'

// 引入element-ui， 按需引入
import { MessageBox } from 'element-ui';
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// console.log(Vue.prototype);

// 注册全局组件 TypeNav
Vue.component(TypeNav.name, TypeNav); // TypeNav 导航栏
Vue.component(Carousel.name, Carousel); // carousel 轮播图
Vue.component(Pagination.name, Pagination); // Pagination 分页器

// 引入mockServer.js --- mock数据
import '@/mock/mockServer';
// 引入swiper样式
import "swiper/css/swiper.css";
// 统一接口api文件里的全部函数
import * as API from '@/api'
// 引入懒加载
import VueLazyload from 'vue-lazyload';
import atm from '@/assets/1.jpg'

Vue.use(VueLazyload, {
  // preLoad: 1.3,
  //  懒加载默认图片
  loading: atm,
  // attempt: 1
})
// 引入表单校验插件 vee-vaildate
import '@/plugins/vaildate'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 使用路由Vue-Router
  router,
  // 使用vuex的store
  store,
  // 全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    // 全局挂载api文件的函数
    Vue.prototype.$API = API;
  },
}).$mount('#app')