import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store/store'
import App from '../app'
import Login from '../page/Login'
import Index from '../page/Index'
import {deviceInfo} from "../util/device"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: App,
    children: [
    {path: '/Login', name: '登录', component: Login},
    {path: '/Index', name: '车辆列表', component: Index,meta: {requireAuth: true}},
      {path:'*', redirect: '/Login'}
    ]
  }
]
const router = new VueRouter({
  routes: routes, 
  saveScrollPosition: true ,
  history: true
})
//登录控制
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (localStorage.getItem("Station_user_Name")) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            localStorage.clear();
            next({
                path: '/Login',
            })
        }
    }
    else {
        next();
    }
})
router.afterEach((to, from, next) => {
  var ISMobile = deviceInfo()
  Store.state.activeRoute=to.name;
  Store.state.isMobile=ISMobile;
  document.title = to.name;
  Store.commit('ROUTE_CHANGE',{activeRoute: to.name})
      
})
export default router
