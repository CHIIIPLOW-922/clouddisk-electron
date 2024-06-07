import axios from 'axios';

import MessageUtils from '@/utils/MessageUtils';
import { generateUniqueId } from '@/utils/UUID';
import { ElLoading } from 'element-plus';


let loading = null
const uniqueId = generateUniqueId()
const contentTypeForm = 'application/x-www-form-urlencoded;charset=UTF-8'
const contentTypeJson = 'application/json'
const responseTypeJson = "json"

const service = axios.create({
    baseURL: '/api',
    timeout: 50 * 1000
});


service.interceptors.request.use(
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
service.interceptors.response.use(
    (response) => {
        const { showLoading = true, errorCallback } = response.config;
        if (showLoading && loading) {
            loading.close()
        }
        const responseData = response.data;
        if (responseData.code == 200 || response.status == 200) {
            return responseData;
        } else if (responseData.code == 901) {
            router.push("/login?redirectUrl=" + encodeURI(router.currentRoute.value.path));
            return Promise.reject({ showError: false, msg: "登录超时" });
        } else {
            if (errorCallback) {
                errorCallback(responseData.info);
            }
            return Promise.reject({ showError: true, msg: responseData.info });
        }
    },
    (error) => {
        if (error.config.showLoading && loading) {
            loading.close();
        }
        return Promise.reject({ showError: true, msg: "网络异常" })
    }
);

class HttpClient {
    static post(url, params, config = {}) {
        return service.post(url, this._parseParams(params), this._getRequestConfig(config));
    }

    static get(url, config = {}) {
        return service.get(url, { params: config.params, ...this._getRequestConfig(config) });
    }

    static _parseParams(params) {
        let formData = new FormData();
        for (let key in params) {
            formData.append(key, params[key] == undefined ? "" : params[key]);
        }
        return formData;
    }

    static _getRequestConfig(config) {
        const { dataType, showLoading = true, responseType = responseTypeJson } = config;
        let contentType = contentTypeForm;
        if (dataType != null && dataType == 'json') {
            contentType = contentTypeJson;
        }
        let headers = {
            'Content-Type': contentType,
            'X-Requested-With': 'XMLHttpRequest',
            'X-Unique-ID': uniqueId
        }
        return {
            onUploadProgress: (event) => {
                if (config.uploadProgressCallback) {
                    config.uploadProgressCallback(event);
                }
            },
            responseType: responseType,
            headers: headers,
            showLoading: showLoading,
            errorCallback: config.errorCallback,
            showError: config.showError
        };
    }
}

export default HttpClient;

