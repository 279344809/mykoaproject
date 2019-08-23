const QcloudSms = require("qcloudsms_js");
// 短信应用 SDK AppID
const appid = 1400216115;
// 短信应用 SDK AppKey
const appkey = "920b6e4190bc4dd1942292cdef3cece9";
// 短信模板 ID
const templateId = 385869;
// 签名
const smsSign = "zhuyifei";
const qcloudsms = QcloudSms(appid, appkey);
var ssender = qcloudsms.SmsSingleSender();
module.exports = function sendmsg(phoneNumber,code, callback) {
    var params = [code,'10'];
    console.log('发送验证码咯'+phoneNumber+' '+code)
    ssender.sendWithParam(86, phoneNumber, templateId,
        params, smsSign, "", "", callback);
}
