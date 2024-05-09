const NewsService = require('../../service/admin/NewsService');

const NewsController = {
    add: async (req, res) => {
        let cover = req.file ? `/newsuploads/${req.file.filename}` : "";
        let { title, content, category, isPublish } = req.body;
        let data = await NewsService.add({
            title: title,
            content: content,
            category: Number(category),
            isPublish: Number(isPublish),
            cover: cover,
            editTime: new Date()

        });

        if (data) {
            res.send({
                code: 0,
                msg: '添加成功',
                data: data
            })
        }

    },
    get: async (req, res) => {
        let newsData;
        if (Object.keys(req.params).length === 0) {
            newsData = await NewsService.get();
        } else {
            let { _id } = req.params;
            if (!_id) return res.send('_id无效');
            newsData = await NewsService.get(_id);
        }
        res.send({
            code: 0,
            msg: '获取新闻成功',
            data: newsData
        })
    },
    editIsPublish: async (req, res) => {
        let resultData = await NewsService.editIsPublish(req.body);
        if (resultData.acknowledged) {
            res.send({
                code: 0,
                msg: '编辑发布状态成功',
                data: null
            })
        }
    },
    del: async (req, res) => {
        let returnData = await NewsService.del(req.params);
        if (returnData.acknowledged) {
            res.send({
                code: 0,
                msg: '删除成功',
                data: null
            })
        }
    },
    update: async (req, res) => {
        let returnData = await NewsService.update(req.body);

        if (returnData.acknowledged) {
            res.send({
                code: 0,
                msg: '修改成功',
                data: null
            })
        }
    }
}

module.exports = NewsController;