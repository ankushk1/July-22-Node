const express = require("express");
const {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
  getCategoryById,
  deactivateCategory
} = require("../controller/categoryController");
const { validateToken } = require("../middleware/jwt");
const router = express.Router();

router.post("/addCategory", validateToken, createCategory);
router.get("/getCategories", validateToken, getCategories);
router.delete("/deleteCategory/:id", validateToken, deleteCategory);
router.put("/updateCategory/:id", validateToken, updateCategory);
router.put("/deactivateCategory/:id", validateToken, deactivateCategory);
router.get("/getById/:id", validateToken, getCategoryById);

module.exports = router;
