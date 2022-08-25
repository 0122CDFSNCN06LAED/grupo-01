const { Router } = require("express");
const cartController = require("../controllers/cartSequelizeController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

//CARRITO
router.get("/cart", authMiddleware, cartController.cart);

//AGREGAR PRODUCTO AL CARRITO
router.get("/cart/add/:id", cartController.cartAdd);

module.exports = router;
