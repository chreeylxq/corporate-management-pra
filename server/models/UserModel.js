const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    gender: Number, // 1:female, 0:male -1:secret
    introduction: String,
    avatar: String,
    role: Number //管理员1 ，编辑2
})

let userModel = mongoose.model('users', userSchema);
module.exports = userModel