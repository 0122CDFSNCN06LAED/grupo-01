const path = require("path");
const express = require("express");
const productController = require("../controllers/productController");
const productSequelizeController = require("../controllers/productSequelizeController");
const authMiddleware = require("../middlewares/authMiddleware")

const multer = require("multer");
const clientMiddleware = require("../middlewares/clientMiddleware");
const {
  validateProductEdit,
  validateProdEdit,
  validateProductCreate,
} = require("../middlewares/validateProductEditMiddleware");

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
router.get("/product", productSequelizeController.list);
//VISTA DETALLE
router.get("/product/detail/:id", productSequelizeController.product);
//CREACION PRODUCTO
router.get(
  "/product/create",
  clientMiddleware,
  productSequelizeController.create
);
router.post(
  "/product/create",
  uploadFile.single("image"),
  validateProductCreate,
  validateProductEdit,
  productSequelizeController.store
);
//EDICION PRODUCTO
router.get(
  "/product/edit/:id",
  clientMiddleware,
  productSequelizeController.edit
);
router.put(
  "/edit/:id",
  uploadFile.single("editImage"),
  validateProdEdit,
  validateProductEdit,
  productSequelizeController.update
);

//BORRAR PRODUCTO
router.get(
  "/product/delete/:id",
  clientMiddleware,
  productSequelizeController.delete
);

router.delete(
  "/product/delete/:id",
  clientMiddleware,
  productSequelizeController.destroy
);
//SEARCH
router.get("/product/search", productSequelizeController.search);

//CARRITO
router.get("/cart/:id", authMiddleware, productSequelizeController.cart);

// ERROR DE PRODUCTO
router.get("/product/error", productSequelizeController.error);

module.exports = router;
