import {request} from './request'

//登录请求
export const reqLogin = ({username,password}) => {
  return request({
    url:'login',
    method:'post',
    data:{
      username,
      password
    }
  })
}