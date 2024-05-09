const UserService = require('../../service/admin/UserService');
const jwt = require('../../utils/JWT');

const UserController = {
    login: async (req, res) => {
        let result = await UserService.login(req.body);
        if (!result) {//登录失败
            res.json({
                code: -1,
                msg: '用户名或密码错误'
            })
        } else {//登录成功
            //请求头设置token
            res.setHeader('Authorization', jwt.generate({ _id: result._id, username: result.username }))
            res.json({
                code: 0,
                msg: '登录成功',
                data: {
                    username: result.username,
                    gender: result.gender ? result.gender : 0,
                    introdction: result.introduction,
                    avatar: result.avatar,
                    role: result.role
                }
            })
        }
        console.log(result)
    },
    upload: async (req, res) => {
        let token = req.headers.authorization.split(' ')[1];
        let payload = jwt.verify(token);
        let returnData;
        try {
            if (req.body.file === 'null') {
                await UserService.upload({ _id: payload._id, ...req.body });
                returnData = {
                    username: req.body.username,
                    gender: Number(req.body.gender),
                    introduction: req.body.introduction
                }
            } else {
                let avatarPath = `/avatarupload/${req.file.filename}`
                await UserService.upload({ _id: payload._id, avatarPath: avatarPath, ...req.body });
                returnData = {
                    username: req.body.username,
                    gender: Number(req.body.gender),
                    introduction: req.body.introduction,
                    avatar: avatarPath
                }
            }
            res.json({
                code: 0,
                msg: '上传成功',
                data: returnData
            })
        } catch (error) {
            console.log(error.message);
            res.json({
                code: 400,
                message: '上传失败',
                data: null
            })
        }
    },
    addUser: async (req, res) => {
        try {
            let result;
            if (req.body.file === 'null') {
                result = await UserService.addUser(req.body);
            } else {
                let avatarPath = `/avatarupload/${req.file.filename}`;
                result = await UserService.addUser({ ...req.body, avatar: avatarPath })
            }
            res.json({
                code: 0,
                msg: 'user 添加成功',
                data: result
            })
        } catch (error) {
            console.log(error.message);
            res.json({
                code: -1,
                msg: error.msg
            })
        }

    },
    getUserList: async (req, res) => {
        try {
            let result = await UserService.getUserList();
            res.json({
                code: 0,
                msg: 'userList 获取成功',
                data: result
            })
        } catch (error) {
            res.json({
                code: -1,
                msg: error.msg
            })
        }

    },
    delUser: async (req, res) => {
        try {
            console.log('userController')
            console.log(req.params)
            let result = await UserService.delUser(req.params);
            res.json({
                code: 0,
                msg: '删除成功',
                data: result
            })

        } catch (error) {
            res.json({
                code: -1,
                msg: error.msg
            })
        }
    },
    editUser: async (req, res) => {
        try {
            console.log(req.body);
            let result = await UserService.editUser(req.body);
            res.json({
                code: 0,
                msg: '编辑成功',
                data: result
            })
        } catch (error) {
            res.json({
                code: -1,
                msg: error.msg
            })
        }
    }
}
module.exports = UserController;