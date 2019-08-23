const Qsms = require("qcloudsms")
const appid = 1400216115;
const appkey = "920b6e4190bc4dd1942292cdef3cece9";
const templateId = 385869;
const smsSign = "zhuyifei";
const qsms = new Qsms(appid, appkey)


module.exports = async function sendmsg(phoneNumber, code) {

    return new Promise((resolve, reject) => {
        qsms.singleSendWithParams({
            phoneNumber: phoneNumber,
            params: [code,'10'],
            tpl_id: templateId,
            sign: smsSign
        }).then(res => {
            if (res.data.result === 0) {
                resolve(true);
            } else {
                console.log(res)
                resolve(false);
            }
        }).catch(res=>{
            reject(false);
        })

    })



}


