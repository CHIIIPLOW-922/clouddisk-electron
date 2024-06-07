import RequestUtils from '@/utils/RequestUtils'

export async function generateCaptcha(){
    const response = await RequestUtils.get('user/generateCaptcha')
    return response.result
}