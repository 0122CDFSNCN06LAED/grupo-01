const { Router } = require("express");
const {
  ProductCategories,
} = require("../../controllers/api/CategoriesProdApiController");
const {
  productsList,
  allProducts,
} = require("../../controllers/api/ProductListApiController");
const router = Router();

router.get("/table-products", productsList);
router.get("/categories-products", ProductCategories);
router.get("/products", allProducts);

module.exports = router;
