import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@/router'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '@/assets/base.scss'
import '@/assets/cust-elementplus.scss'
import '@/assets/icon/iconfont.css'

import MessageUtils from '@/utils/MessageUtils'
import RequestUtils from '@/utils/RequestUtils'

import * as Icons from '@element-plus/icons-vue'



const app = createApp(App)
const pinia = createPinia()


// 全局注册所有图标
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key])
})


app.use(ElementPlus)
app.use(router)
app.use(pinia)



app.config.globalProperties.MessageUtils = MessageUtils
app.config.globalProperties.$http = RequestUtils



app.mount('#app')