const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

const cart = require ('../controllers/cartController');

router.get('/cart', cartController.cart);

module.exports= router;
