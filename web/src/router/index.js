import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue';
import News from '../views/News.vue';
import Product from '../views/Product.vue';
import NewsPage from '../views/NewsPage.vue'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/news',
    name: 'news',
    component: News
  },
  {
    path: '/product',
    name: 'product',
    component: Product
  }, {
    path: '/newspage/:id',
    name: 'newpage',
    component: NewsPage
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//路由前置钩子
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
})
//路由后置钩子
router.afterEach((to, from, next) => {
  NProgress.done();

})

export default router
