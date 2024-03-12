const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/categoryController");

// Instantiate CategoryController with the path to your database file
const categoryController = new CategoryController("../database.db");

// Routes for categories
router.get(
  "/category",
  categoryController.getAllCategories.bind(categoryController)
);
router.get(
  "/category/:id",
  categoryController.getCategoryById.bind(categoryController)
);
router.post(
  "/category",
  categoryController.createCategory.bind(categoryController)
);
router.put(
  "/category/:id",
  categoryController.updateCategory.bind(categoryController)
);
router.delete(
  "/category/:id",
  categoryController.deleteCategory.bind(categoryController)
);

module.exports = router;
