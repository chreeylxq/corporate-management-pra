const ProductService = require('../../service/web/ProductService');

const ProductController = {
    get: async (req, res) => {
        let result = await ProductService.get();
        console.log(result);
        if (result) {
            res.send({
                code: 0,
                msg: 'web获取产品成功',
                data: result
            })
        } else {
            res.send({
                code: -1,
                msg: 'web获取产品失败',
                data: null
            })
        }
    }
}

module.exports = ProductController;
