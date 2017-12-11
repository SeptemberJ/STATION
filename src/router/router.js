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
    {path: '/Index', name: '车辆列表', component: Index},
      {path:'*', redirect: '/Login'}
    ]
  }
]
const router = new VueRouter({
  routes: routes, 
  saveScrollPosition: true ,
  history: true
})

router.afterEach((to, from, next) => {
  var ISMobile = deviceInfo()
  Store.state.activeRoute=to.name;
  Store.state.isMobile=ISMobile;
  document.title = to.name;
  Store.commit('ROUTE_CHANGE',{activeRoute: to.name})
      
})
export default router
