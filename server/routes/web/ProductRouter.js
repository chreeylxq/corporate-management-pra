const express = require('express');
const router = express.Router();

const ProductController = require('../../controllers/web/ProductController');

router.get('/webapi/product/list', ProductController.get);

module.exports = router;