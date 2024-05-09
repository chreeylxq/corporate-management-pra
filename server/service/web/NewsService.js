const NewsModel = require('../../models/NewsModel')

const NewsService = {
    get: async ({ _id }) => {
        console.log("_id:" + _id)
        return _id ?
            await NewsModel.findOne({ _id, isPublish: 1 }) :
            await NewsModel.find({ isPublish: 1 }).sort({ editTime: -1 });
    },
    getTopList: async ({ limit }) => {
        return await NewsModel.find({ isPublish: 1 }).sort({ editTime: -1 }).limit(limit);
    }

}

module.exports = NewsService;