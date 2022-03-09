// 对 axios 进行二次封装
import axios from 'axios';
// 引入nprogress进度条
import nprogress from 'nprogress';
// console.log(nprogress);
//nprogress是一个对象，有许多的方法 其中有 start进度条开始  done 进度条结束
// 还需要引入nprogress进度条的样式
import 'nprogress/nprogress.css'

// 1. 利用axios对象的方法 create,去创建一个axios实例
// 2. request 就是axios，需要对其进行配置
const mockRequests = axios.create({
  //配置对象
  baseURL: '/mock', //基础路径，发送请求时，修改到mock
  timeout: 5000, // 请求响应时间 5s

});
// 请求拦截器： 在发送请求前，请求拦截器可以检测到，在请求前处理一些业务
mockRequests.interceptors.request.use((config) => {
  // config:配置对象，对象中有一个很重要的属性， headers 请求头
  // 进度条开始
  nprogress.start()
  return config
});
// 响应拦截器
mockRequests.interceptors.response.use((res) => {
  // 这是成功的回调函数：服务器返回相应的数据回来后，响应拦截器可以检测到并处理
  // 进度条结束
  nprogress.done()
  return res.data;
}, (error) => {
  // 这是失败的回调函数
  return Promise.reject(new Error(error))
})



// 对外暴露
export default mockRequests