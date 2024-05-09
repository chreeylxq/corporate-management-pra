const cookieParser = require('cookie-parser');
const ProductService = require('../../service/admin/ProductService');

const ProductController = {
    add: async (req, res) => {
        let { title, introduction, detail } = req.body;
        let coverPath = `/productuploads/${req.file.filename}`;
        let result = await ProductService.add({
            title: title,
            introduction: introduction,
            detail: detail,
            cover: coverPath,
            editTime: Date.now()
        })
        if (result) {
            res.send({
                code: 0,
                msg: '添加产品成功'
            })
        } else {
            res.send({
                code: -1,
                msg: '添加产品失败'
            })
        }
    },
    get: async (req, res) => {
        if (Object.keys(req.params).length !== 0) {
            let product = await ProductService.get(req.params);
            if (product) {
                res.send({
                    code: 0,
                    msg: '获取产品成功',
                    data: product
                })
            } else {
                res.send({
                    code: -1,
                    msg: '获取产品失败',
                    data: null
                })
            }
        } else {
            let list = await ProductService.get();
            if (list) {
                res.send({
                    code: 0,
                    msg: '获取产品成功',
                    data: list
                })
            } else {
                res.send({
                    code: -1,
                    msg: '没有产品列表',
                    data: null
                })
            }
        }

    },
    del: async (req, res) => {
        let result = await ProductService.del(req.params);
        if (result.acknowledged) {
            res.send({
                code: 0,
                msg: '删除成功',
                data: null
            })
        } else {
            res.send({
                code: -1,
                msg: '删除失败',
                data: null
            })
        }
    },
    update: async (req, res) => {
        let result = await ProductService.update(req.body);
        console.log(result);
        if (result.acknowledged) {
            res.send({
                code: 0,
                msg: '修改成功',
                data: null
            })
        } else {
            res.send({
                code: -1,
                msg: '修改失败',
                data: null
            })
        }
    }
}

module.exports = ProductController;