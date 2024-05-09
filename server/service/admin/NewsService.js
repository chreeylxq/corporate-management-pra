const NewsModel = require('../../models/NewsModel');

const NewsService = {
    add: async (req) => {
        return await NewsModel.create(req);
    },
    get: async (param) => {
        if (!param) {
            return await NewsModel.find();
        } else {
            return await NewsModel.findOne({ _id: param })
        }


    },
    editIsPublish: async ({ _id, isPublish }) => {

        return await NewsModel.updateOne({ _id: _id }, { isPublish: isPublish, editTime: new Date() })
    },
    del: async ({ _id }) => {
        console.log(_id);
        return await NewsModel.deleteOne({ _id: _id })
    },
    update: async ({ _id, title, content, category, cover }) => {
        return await NewsModel.updateOne({ _id }, { title, content, category, cover });
    }
}

module.exports = NewsService;