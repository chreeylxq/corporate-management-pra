const mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
    title: String,
    introduction: String,
    detail: String,
    cover: String,
    editTime: String
})

let productModel = mongoose.model('product', productSchema);
module.exports = productModel;