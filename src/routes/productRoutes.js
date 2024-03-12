const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");

// Instantiate ProductController with the path to your database file
const productController = new ProductController("../database.db");

// Routes for products
router.get(
  "/product",
  productController.getAllProducts.bind(productController)
);
router.get(
  "/product/:id",
  productController.getProductById.bind(productController)
);
router.post(
  "/product",
  productController.createProduct.bind(productController)
);
router.put(
  "/product/:id",
  productController.updateProduct.bind(productController)
);
router.delete(
  "/product/:id",
  productController.deleteProduct.bind(productController)
);

module.exports = router;
