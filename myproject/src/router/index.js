import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Login = () => import('views/login/Login')
const Test = () => import('components/Test')
const UserList = () => import('views/user/UserList')
const RoolList = () => import('views/rool/RoolList')
const RoleList = () => import('views/rool/RoleList')

Vue.use(VueRouter)


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/login',
    component:Login
  },
  {
    path:'/home',
    component:Home,
    children:[
      {
        path:'/users',
        component:UserList
      },
      {
        path:'/rights',
        component: RoolList
      },
      {
        path:'/roles',
        component:RoleList
      },
    ]
  },
  {
    path:'/test',
    component:Test
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
