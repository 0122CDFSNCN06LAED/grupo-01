const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

/* const user = require ('../controllers/userController'); */

router.get('/user/login', userController.login);
router.get('/user/register', userController.register);
router.post("/user/register", userController.register);

module.exports= router;
