const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

const login = require ('../controllers/loginController');

router.get('/login', loginController.login);

module.exports= router;
