const appid = 'wx0ad35abe0567768f'
const secret = 'd651ac03645a922a1061288dd6f2ac3a'
const axios = require('axios')

class accessToken {

    static accesstoken = ''
    static exp = 0
    static async refreshaccesstoken() {
        let doudata = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`).then((res) => {
            return res
        })
        console.log('获得accesstoken成功')
        console.log(doudata.data)
        accesstoken = doudata.data.access_token
        exp = Date.now() + doudata.data.expires_in * 1000

    }

}

module.exports = accessToken