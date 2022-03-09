// 引入mock
import Mock from 'mockjs';
// 将json数据引入
import banner from './banner.json';
import floors from './floors.json';

// mock数据 参数一 请求地址 参数二 请求数据
Mock.mock('/mock/banner', {
  code: 200,
  data: banner
});// 模拟首页大的轮播图的数据
Mock.mock('/mock/floors', {
  code: 200,
  data: floors
});// floors的数据