import MessageUtils from '@/utils/MessageUtils'
import RequestUtils from '@/utils/RequestUtils'

const api = {
    captcha: 'user/generateCaptcha',
    login: 'user/login',
    sendEmail: 'user/sendEmail',
    register: 'user/register',
    logout: 'user/logout',
    usedDiskSpace: 'user/usedDiskSpace',
    getUserInfo: 'user/getUserInfo'
}

export async function generateCaptcha(config) {
    try {
        return await RequestUtils.get(api.captcha, config)
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
        console.log(error)
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

export async function getUsedDiskSpace(config) {
    try {
        return await RequestUtils.get(api.usedDiskSpace, config)
    } catch (error) {
        console.log(error)
    }
}

export async function getUserInfo(config) {
    try {
        return await RequestUtils.get(api.getUserInfo, config)
    } catch (error) {
        console.log(error)
    }
}