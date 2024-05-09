var express = require('express');
var router = express.Router();
let ProductController = require('../../controllers/admin/ProductController')

//涉及到文件上传， 普通的post不行，需要加上 multer 中间价
const multer = require('multer');
const upload = multer({ dest: 'public/productuploads/' });

//产品的增删查改操作
router.post('/adminapi/product/addproduct', upload.single('file'), ProductController.add)
router.get('/adminapi/product/list', ProductController.get);
router.delete('/adminapi/product/list/:_id', ProductController.del)
router.get('/adminapi/product/list/:_id', ProductController.get)
router.post('/adminapi/product/updateProduct', upload.single('file'), ProductController.update)
module.exports = router;