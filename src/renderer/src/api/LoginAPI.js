import MessageUtils from '@/utils/MessageUtils'
import RequestUtils from '@/utils/RequestUtils'
import { response } from 'express'

const api = {
    captcha: 'user/generateCaptcha',
    login: 'user/login',
    sendEmail: 'user/sendEmail?email='
}

export async function generateCaptcha() {
    try {
        const response = await RequestUtils.get(api.captcha)
        return response
    } catch (error) {
        console.log(error)
    }

}

export async function userLogin(params, config) {
    try {
        const response = await RequestUtils.post(api.login, params, config)
        return response
    } catch (error) {
        MessageUtils.error(error.msg)
        console.log(error)
    }
}

export async function sendEmail(params, config) {
    try {
        const response = await RequestUtils.post(api.sendEmail+params, null, config)
        return response    
    } catch (error) {
        console.log(response)
    }
}