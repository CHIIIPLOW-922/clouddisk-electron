import MessageUtils from '@/utils/MessageUtils'
import RequestUtils from '@/utils/RequestUtils'

const api = {
    captcha: 'user/generateCaptcha',
    login: 'user/login',
    sendEmail: 'user/sendEmail',
    register: 'user/register',
    logout: 'user/logout'
}

export async function generateCaptcha() {
    try {
        return await RequestUtils.get(api.captcha)
    } catch (error) {
        console.log(error)
    }

}

export async function userLogin(params, config) {
    try {
        return await RequestUtils.post(api.login, params, config)
    } catch (error) {
        MessageUtils.error(error.msg)
        console.log(error)
    }
}

export async function sendEmail(params, config) {
    try {
        return await RequestUtils.post(api.sendEmail, params, config)
    } catch (error) {
        MessageUtils.error(error.msg)
        console.log(response)
    }
}

export async function userRegister(params, config) {
    try {
        return await RequestUtils.post(api.register, params, config)    
    } catch (error) {
        MessageUtils.error(error.msg)
        console.log(error)
    }
}

export async function userLogout(params, config) {
    try {
        return await RequestUtils.post(api.logout, params, config)
    } catch (error) {
        MessageUtils.error(error.msg)
        console.log(error)
    }
}