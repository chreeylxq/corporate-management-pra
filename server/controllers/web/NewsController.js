const NewsService = require('../../service/web/NewsService');

const NewsController = {
    get: async (req, res) => {
        let data = await NewsService.get(req.params);
        if (data) {
            res.send({
                code: 0,
                msg: 'web获取新闻成功',
                data: data
            })
        } else {
            res.send({
                code: -1,
                msg: 'web获取新闻失败',
                data: null
            })
        }
    },
    getTopList: async (req, res) => {
        let data = await NewsService.getTopList(req.query);
        if (data) {
            res.send({
                code: 0,
                msg: 'web获取新闻成功',
                data: data
            })
        } else {
            res.send({
                code: -1,
                msg: 'web获取新闻失败',
                data: null
            })
        }
    }
}

module.exports = NewsController;