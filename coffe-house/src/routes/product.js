const express = require('express');
const productController = require('../controllers/productController');
const multer = require ('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb (null, path.join(__dirname,'../../public/img/products'))
    },
    filename: (req, file, cb) => {
        const newFilename = 'product-'+ Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});
const uploadFile = multer({ storage });

const router = express.Router();
//VISTA DETALLE
router.get('/product/detail/:id', productController.product);
//CREACION PRODUCTO
router.get('/product/create', productController.create);
router.post('/product/create', uploadFile.single('image'), productController.store);
//EDICION PRODUCTO
router.get('/edit/:id', productController.edit); 
router.put('/:id', productController.update); 
//CARRITO
router.get('/cart', productController.cart);

module.exports= router;
