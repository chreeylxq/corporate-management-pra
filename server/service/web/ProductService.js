const ProductModel = require('../../models/ProductModel');

const ProductService = {
    get: async () => {
        return await ProductModel.find();
    }
}

module.exports = ProductService;