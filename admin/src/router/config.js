import home from '../views/home/home.vue';
import center from '../views/center/center.vue';
import news_add from '../views/news-manage/NewsAdd.vue';
import news_list from '../views/news-manage/NewsList.vue';
import news_edit from '../views/news-manage/NewsEdit.vue';
import product_add from '../views/product-manage/ProductAdd.vue';
import product_list from '../views/product-manage/ProductList.vue';
import product_edit from '../views/product-manage/ProductEdit.vue';
import user_add from '../views/user-manage/UserAdd.vue';
import user_list from '../views/user-manage/UserList.vue'
import NotFound from '../views/notfound/notFound.vue';

const routes = [
    {
        path: '/index',
        component: home
    },
    {
        path: '/center',
        component: center
    },
    {
        path: '/news-manage/addNews',
        component: news_add
    },
    {
        path: '/news-manage/newsList',
        component: news_list
    },
    {
        path: '/news-manage/editNews/:_id',
        component: news_edit
    },
    {
        path: '/product-manage/addProduct',
        component: product_add
    },
    {
        path: '/product-manage/productList',
        component: product_list
    },
    {
        path: '/product-manage/editProduct/:id',
        component: product_edit
    },
    {
        path: '/user-manage/addUser',
        component: user_add,
        requireAuth: true
    },
    {
        path: '/user-manage/userList',
        component: user_list,
        requireAuth: true
    },
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/:pathMatch(.*)*',
        // name: NotFound,
        component: NotFound
    }

];
export default routes;