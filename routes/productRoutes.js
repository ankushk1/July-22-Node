const express = require("express");
const {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  changeQuantity
} = require("../controller/productController");

const { validateToken } = require("../middleware/jwt");
const router = express.Router();

router.post("/addProduct", validateToken, createProduct);
router.get("/getProducts", validateToken, getProducts);
router.delete("/deleteProduct/:id", validateToken, deleteProduct);
router.put("/updateProduct/:id", validateToken, updateProduct);
router.put("/changeQuantity/:id", validateToken, changeQuantity);
// router.get("/getById/:id", validateToken, getCategoryById);

module.exports = router;
