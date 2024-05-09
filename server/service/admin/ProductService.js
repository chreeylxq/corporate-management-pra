const ProductModel = require('../../models/ProductModel')

const ProductService = {
    add: async (req) => {
        console.log(req);
        return await ProductModel.create(req);
    },
    get: async (params) => {
        if (params) {
            let { _id } = params;
            return await ProductModel.find({ _id: _id });
        }
        return await ProductModel.find();
    },
    del: async (params) => {
        return await ProductModel.deleteOne(params);
    },
    update: async ({ _id, title, introduction, cover }) => {
        return await ProductModel.updateOne(
            { _id: _id },
            { title: title, introduction: introduction, cover: cover, editTime: Date.now() })
    }
}
module.exports = ProductService;