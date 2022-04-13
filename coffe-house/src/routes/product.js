const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

/* const product = require ('../controllers/productController'); */

router.get('/product/detail', productController.product);
router.get('/product/create', productController.create);
router.get('/product/edit', productController.edit);
router.get('/cart', productController.cart);

module.exports= router;
