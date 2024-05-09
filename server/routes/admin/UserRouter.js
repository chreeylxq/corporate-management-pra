var express = require('express');
var router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'public/avatarupload/' })

const UserController = require('../../controllers/admin/UserController');

//登录
router.post('/adminapi/user/login', (req, res) => {
    UserController.login(req, res);
});

//修改个人信息
router.post('/adminapi/user/upload', upload.single('file'), (req, res) => {
    UserController.upload(req, res);
})

//实现用户的增删查改
//添加user
router.post('/adminapi/user/addUser', upload.single('file'), (req, res) => {
    UserController.addUser(req, res);
})
//获取user列表
router.get('/adminapi/user/userList', (req, res) => {
    console.log('获取user列表')
    UserController.getUserList(req, res);
})
//删除user
router.delete(`/adminapi/user/list/:id`, (req, res) => {
    UserController.delUser(req, res);
});
//编辑user
router.post('/adminapi/user/editUser', (req, res) => {
    UserController.editUser(req, res);
})
module.exports = router;