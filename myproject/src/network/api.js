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

//用户菜单栏数据请求
export const reqMenu = () => {
  return request({
    url:'menus',
    method: 'get',
  })
}

//获取用户列表数据请求
export const reqUser = (params) => {
  return request({
    url:'users',
    method:'get',
    params
    // params:{
    //   query:'',
    //   pagenum:'1',
    //   pagesize:'2'
    // }
  })
}