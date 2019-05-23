var mysql = require('mysql');
var config = require('./baseconfig');
var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});
let sqlServices = {
    query:  (sql, values) =>  {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, values, (err, rows) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        connection.release()
                    })
                }
            })
        })
    },
    findAllUserData: () => {
        let sql = `select * from user;`
        return sqlServices.query(sql)
    },
    findUserData: (name) => {
        let sql = `select * from user where name="${name}";`
        return sqlServices.query(sql)
    },
    findUserDatabyId: (id) => {
        let sql = `select * from user where id="${id}";`
        return sqlServices.query(sql)
    },
    addUserData: (obj) => {
        let sql = `insert into user set name="${obj.name}",password="${obj.password}";`
        return sqlServices.query(sql)
    },
}

module.exports = sqlServices;