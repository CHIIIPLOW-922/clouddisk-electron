import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@/router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '@/assets/base.scss'
import '@/assets/cust-elementplus.scss'
import '@/assets/icon/iconfont.css'

import MessageUtils from '@/utils/MessageUtils'
import RequestUtils from '@/utils/RequestUtils'


const app = createApp(App)

app.use(ElementPlus)
app.use(router)



app.config.globalProperties.MessageUtils = MessageUtils
app.config.globalProperties.$http = RequestUtils


   
app.mount('#app')