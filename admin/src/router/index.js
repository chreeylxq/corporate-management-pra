import { createRouter, createWebHashHistory } from 'vue-router'
import login from '../views/login.vue';
import main_box from '../views/main_box.vue';
import route_config from '../router/config.js';
import store from '../store/index';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/main_box',
    name: 'main_box',
    component: main_box
  }
  // main——box的嵌套路，根据权限动态添加
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//动态添加子路由
router.beforeEach((to, from, next) => {
  console.log("fullPath: " + to.fullPath);
  if (to.name === 'login') {
    next()
  } else if (!localStorage.getItem('token')) {//若是没有token，重定向login
    console.log('没有token')
    next({
      path: '/login'
    })
  } else { //若有token，添加子路由
    if (!store.state.isGetterRouter) {
      //删除main_box的所有嵌套路由 删除main_box
      router.removeRoute('main_box');
      console.log('第一次添加路由');
      configRouter(to);
      next({
        path: to.fullPath
      })
    } else {
      next()
    }
  }
})
let configRouter = (to) => {
  //判断是否有mian_box
  if (!router.hasRoute('main_box')) {
    router.addRoute({
      path: '/main_box',
      name: 'main_box',
      component: main_box
    })
  }
  route_config.forEach(item => {
    authPermission(item) && router.addRoute('main_box', item);
  })

  //改变 isGetterRouter = true
  store.commit('changeGetterRouter', true);
}

const authPermission = (item) => {
  if (item.requireAuth) {
    return store.state.userInfo.role === 1;
  }
  return true;
}
export default router
