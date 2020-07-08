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

//改变用户状态数据请求
export const changeState = (id,state) => {
  return request({
    url:`users/${id}/state/${state}`,
    method:'put',
  })
}

//添加用户数据请求
export const addUser = (data) => {
  return request({
    url:'users',
    method:'post',
    data
  })
}

//修改用户数据请求
export const modifyUser = (id,data) => {
  return request({
    url:`users/${id}`,
    method:'put',
    data
  })
}

//删除用户数据请求
export const deleteUser = (id) => {
  return request({
    url:`users/${id}`,
    method:'delete'
  })
}

//获取角色列表数据请求
export const getUserRoleList = () => {
  return request({
    url:'roles',
    method:'get'
  })
}

//分配用户角色数据请求
export const allotUser = (id,rid) => {
  return request({
    url:`users/${id}/role`,
    method:'put',
    data:{
      rid
    }
  })
}

//获取权限列表数据请求
export const getUserRightList = () => {
  return request({
    url:'rights/list',
    method:'get'
  })
}

//添加角色请求
export const addUserRoleList = (roleName,roleDesc) => {
  return request({
    url:'roles',
    method:'post',
    data:{
      roleName,
      roleDesc
    }
  })
}

//删除角色特定权限
export const deleteUserRight = (roleid,rightid) => {
  return request({
    url:`roles/${roleid}/rights/${rightid}`,
    method:'delete'
  })
}

//删除角色
export const deleteUserRole = (id) => {
  return request({
    url:`roles/${id}`,
    method:'delete'
  })
}

//编辑提交角色
export const updateUserRole = (id,roleName,roleDesc) => {
  return request({
    url:`roles/${id}`,
    method:'put',
    data:{
      roleName,
      roleDesc
    }
  })
}







