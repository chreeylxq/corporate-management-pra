var express = require('express');
var router = express.Router();
const NewsController = require('../../controllers/admin/NewsController');

//涉及到文件上传， 普通的post不行，需要加上 multer 中间价
const multer = require('multer');
const upload = multer({ dest: 'public/newsuploads/' });

//新闻的增删查改操作
router.post('/adminapi/news/addNews', upload.single('file'), NewsController.add)

router.get('/adminapi/news/list', NewsController.get)
router.get('/adminapi/news/news/:_id', NewsController.get)
router.put('/adminapi/news/list', NewsController.editIsPublish);
router.delete('/adminapi/news/list/:_id', NewsController.del);
//编辑
router.post('/adminapi/news/oneNews', upload.single('file'), NewsController.update);
module.exports = router;
