const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: String,
    content: String,
    category: Number, //类别 1，2，3
    cover: String, //封面
    isPublish: Number,//是否发布 0 未发布 1发布
    editTime: Date,
    auth: String
});

let newsModel = mongoose.model('news', newsSchema);
module.exports = newsModel;

