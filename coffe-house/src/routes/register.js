const express = require('express');
const registerController = require('../controllers/registerController');

const router = express.Router();

const register = require ('../controllers/registerController');

router.get('/register', registerController.register);

module.exports= router;
