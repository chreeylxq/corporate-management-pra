const express = require('express');
const router = express.Router();

const NewsController = require('../../controllers/web/NewsController');

router.get('/webapi/news/list', NewsController.get);
router.get('/webapi/news/list/:_id', NewsController.get)
router.get('/webapi/news/toplist', NewsController.getTopList)
module.exports = router;