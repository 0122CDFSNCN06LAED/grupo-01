const express = require("express");
const productController = require("../controllers/productController");
const productSequelizeController = require("../controllers/productSequelizeController");

const multer = require("multer");
const path = require("path");
const clientMiddleware = require("../middlewares/clientMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/img/products"));
  },
  filename: (req, file, cb) => {
    const newFilename =
      "product-" + Date.now() + path.extname(file.originalname);
    cb(null, newFilename);
  },
});
const uploadFile = multer({ storage });

const router = express.Router();

//VISTA LISTAR PRODUCTO
router.get('/product', productSequelizeController.list)
//VISTA DETALLE
router.get("/product/detail/:id", productSequelizeController.product);
//CREACION PRODUCTO
router.get("/product/create",clientMiddleware, productSequelizeController.create);
router.post("/product/create", uploadFile.single("image"), productSequelizeController.store);
//EDICION PRODUCTO
router.get("/product/edit/:id", clientMiddleware, productController.edit);
router.put(
  "/edit/:id",
  uploadFile.single("editImage"),
  productController.update
);

//BORRAR PRODUCTO
router.delete("/product/delete/:id", clientMiddleware, productController.destroy);

//CARRITO
router.get("/cart", productController.cart);

module.exports = router;
