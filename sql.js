const  sqlServices  = require('./dbcontrollers/mysqlconfig.js')


async function getData() {
    let add = await sqlServices.addUserData({ name: 'zhuyifei', password: 'zhuyifei123##' })
    console.log('新增用户')
    console.log(add)
    let dataList = await sqlServices.findAllUserData()
    console.log('查询所有用户')
    console.log(dataList)
}

getData()
