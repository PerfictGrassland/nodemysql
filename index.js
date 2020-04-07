var express = require('express');
var URL = require("url");
var app = express();
const hostname = '114.215.139.176';
//const port = 8088;
// const hostname = '114.215.139.176';
// const port = 8088;
///数据库操作
var mysql = require('mysql');
var TEST_DATABASE = 'runoob';
var TEST_TABLE = 'gradeMes';
var connection = mysql.createConnection({
    //host:'127.0.0.1',
    host: hostname,
    //port: '3306',
    user: 'root',
    password: '123456',
    // database: 'runoob'
});

function singleQuery(connection, sqlStr) {
    return new Promise((resolve, reject) => {
        connection.query(sqlStr, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                let allRes = {
                        results,
                        fields
                    }
                    //console.log('The solution is: ', results, fields);
                resolve(allRes);
            }

        });
    });
}

// 连接数据库，指定特定数据表
connection.connect();
// console.log("链接状态：", connection.connect());
connection.query("use " + TEST_DATABASE);

// 增
function toAddDatas() {
    return singleQuery(connection, `insert into ${TEST_TABLE} (id,name,age) values(null,'zjy','33')`).then((res) => {
        return res;
    }).catch((err) => {
        return err;
    });
}
toAddDatas().then((res) => {
    console.log("插入结果1：", res);
}).catch((err) => {
    console.log("插入结果2：", err);
});
// 删除
function toDeleteDatas() {
    return singleQuery(connection, `delete from ${TEST_TABLE} where id = 7`).then((res) => {
        return res;
    }).catch((err) => {
        return err;
    });
}
// toDeleteDatas().then((res) => {
//     //console.log("删除结果1：", res, res.results, res.results.OkPacket);
//     if (res.results.affectedRows != 0) {
//         console.log("删除成功");
//     } else {
//         console.log("删除失败");
//     }
//     console.log("删除结果1：", res.results, res.results.affectedRows, typeof res.results);
// }).catch((err) => {
//     console.log("删除结果2：", err);
// });
//  改
function toUpdateDatas() {
    return singleQuery(connection, `update ${TEST_TABLE} set name='无资源' where id = 7`).then((res) => {
        return res;
    }).catch((err) => {
        return err;
    });
}
// toUpdateDatas().then((res) => {
//     console.log("修改结果1：", res);
// }).catch((err) => {
//     console.log("修改结果2：", err);
// });
// 查
function toCheckDatas() {
    return singleQuery(connection, `select * from ${TEST_TABLE}`).then((res) => {
        return res;
    }).catch((err) => {
        return err;
    });
}

// toCheckDatas().then((res) => {
//     console.log("测试结果1：", res);
// }).catch((err) => {
//     console.log("测试结果2：", err);
// });

// 原始方法
// connection.query(`select * from ${TEST_TABLE}`, function(error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results, fields);
// });
//设置允许跨域访问该服务.
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
// var bodyParser = require('body-parser')
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function(req, res) {
    console.log("传递参数：", req);
    let result = {
        status: 1,
        data: {
            name: "csj",
            age: "25",
            grade: "3"
        }
    }
    result = JSON.stringify(result);
    res.send(result);
})

function User() {
    this.name;
    this.city;
    this.age;
}
app.get('/getUserInfo', function(req, res, next) {
    var user = new User();
    var params = URL.parse(req.url, true).query;
    if (params.id == '1') {
        user.name = "ligh";
        user.age = "1";
        user.city = "北京市";
    } else {
        user.name = "SPTING";
        user.age = "1";
        user.city = "杭州市";
    }
    var response = { status: 1, data: user };
    let data1 = JSON.stringify(response);
    let data2 = JSON.parse(data1);
    res.send(data2);
});

app.get('/mysql', async(req, res) => {
    console.log("传递参数：", req);
    let result = {
        status: 0,
        data: {}
    };
    try {
        result = await toCheckDatas();
    } catch {
        result = {
            status: -1,
            data: {
                name: "查照数据库失败"
            }
        }
    }
    console.log("数据库数据");
    result = JSON.stringify(result);
    res.send(result);
})

var server = app.listen(8081, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log(`Server running at http://${host}:${port}/`);

})