import {v4 as uuidv4} from 'uuid'
// 要随机生成一个随机字符串，且每次执行不能发生变化
export const getUUID = () => {
  // 先查看本地存储是或否有uuid
  let uuid_token = localStorage.getItem('UUIDTOKEN');
  if (!uuid_token){
    uuid_token = uuidv4();
    // 本地存储随机生成一个存储s
    localStorage.setItem('UUIDTOKEN', uuid_token)
  }
  return uuid_token
}