var express = require('express');
var URL = require("url");
var app = express();
///数据库操作
var mysql = require('mysql');
var TEST_DATABASE = 'runoob';
var TEST_TABLE = 'grademes';
var connection = mysql.createConnection({
    //host:'127.0.0.1',
    host: '114.215.139.176',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'runoob'
});

function singleQuery(connection, sqlStr) {
    return new Promise((resolve, reject) => {
        connection.query(sqlStr, (error, results, fields) => {
            if (error) {
                console.log("失败", error);
                reject(error);
            } else {
                console.log("成功", results);
                resolve(results);
            }

        });
    });
}

// 连接数据库，指定特定数据表
connection.connect();
// console.log("链接状态：", connection.connect());
//connection.query("use " + TEST_DATABASE);
connection.query("use " + TEST_DATABASE, (error, results, fields) => {
    if (error) {
        console.log("连接失败", error);
    } else {
        console.log("连接成功", results, fields);
    }

});


// function toCheckDatas() {
//     return singleQuery(connection, `select * from ${TEST_TABLE}`).then((res) => {
//         return res;
//     }).catch((err) => {
//         return err;
//     });
// }

// toCheckDatas().then((res) => {
//     console.log("查询结果1：", res);
// }).catch((err) => {
//     console.log("查询结果2：", err);
// });