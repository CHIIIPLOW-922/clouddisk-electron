import axios from 'axios'

import { ElLoading } from 'element-plus';
import MessageUtils from '@/utils/MessageUtils'
let loading = null

const instant = axios.create({
    baseURL: '/api',
    timeout: 50 * 1000
});

instant.interceptors.request.use(
    (config) => {
        if (config.showLoading) {
            loading = ElLoading.service({
                lock:true,
                text:"加载中请稍等...",
                background:"rgba(0, 0, 0, 0)",
            })
        }
        return config
    },
    (error) => {
        if (config.showLoading && loading) {
            loading.close()
        }   
        MessageUtils.error("接口请求失败，请检查网络")
        return Promise.reject("接口请求失败，请检查网络")
    }
)

export default instant

