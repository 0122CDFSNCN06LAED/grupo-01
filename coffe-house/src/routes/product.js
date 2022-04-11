const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

const product = require ('../controllers/productController');

router.get('/product', productController.product);

module.exports= router;
