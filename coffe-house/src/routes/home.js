const express = require ('express');
const { Router } = require('express');
const mainController = require ('../controllers/mainController');
const router = express.Router();

router.get('/', mainController.home);
router.get('/nuestros-cafes', mainController.nuestrosCafes)
router.get('/contacto', mainController.contacto)

module.exports= router
