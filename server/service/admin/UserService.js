const userModel = require('../../models/UserModel');

const UserService = {
    login: async ({ username, password }) => {
        return await userModel.findOne({
            username: username,
            password: password,
        })
    },
    upload: async ({ _id, username, gender, introduction, avatarPath }) => {
        if (!avatarPath) {
            return await userModel.updateOne({
                username: username,
                gender: Number(gender),
                introduction: introduction,
            })

        } else {
            return await userModel.updateOne({
                _id: _id
            }, {
                username: username,
                gender: Number(gender),
                introduction: introduction,
                avatar: avatarPath,
            })
        }
    },
    addUser: async (userInfo) => {
        return await userModel.create(userInfo);
    },
    getUserList: async () => {
        return await userModel.find({}, ["username", "role", "gender", "avatar", "introduction"])
    },
    delUser: async ({ id }) => {
        return await userModel.deleteOne({
            _id: id
        })
    },
    editUser: async (editData) => {
        let { _id, username, password, role, introduction } = editData;
        return await userModel.updateOne({
            _id: _id
        }, {
            username: username,
            password: password,
            role: Number(role),
            introduction: introduction,
        })
    },
}



module.exports = UserService;