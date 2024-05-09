import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/axios_config'

//引用element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//引用粒子特效 
import Particles from "@tsparticles/vue3";
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

createApp(App)
    .use(ElementPlus)
    .use(store)
    .use(router)
    .mount('#app')
