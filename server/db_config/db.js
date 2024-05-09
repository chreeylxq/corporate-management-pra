const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/company-system");

mongoose.connection.once('open', (req, res) => {
    console.log('数据库连接成功')
})

mongoose.connection.on('close', (req, res) => {
    console.log('数据库连接失败！')
})