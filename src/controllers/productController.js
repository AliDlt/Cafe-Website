const ProductModel = require("../models/productModel");

class ProductController {
  constructor(dbFilePath) {
    this.productModel = new ProductModel(dbFilePath);
  }

  getAllProducts(req, res) {
    this.productModel.getAllProducts((err, products) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json(products);
    });
  }

  getProductById(req, res) {
    const productId = parseInt(req.params.id);

    this.productModel.getProductById(productId, (err, product) => {
      if (err) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    });
  }

  createProduct(req, res) {
    const productData = req.body;

    this.productModel.createProduct(productData, (err, productId) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json({ id: productId, ...productData });
    });
  }

  updateProduct(req, res) {
    const productId = parseInt(req.params.id);
    const updatedData = req.body;

    this.productModel.updateProduct(productId, updatedData, (err, changes) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      if (changes === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json({ message: "Product updated successfully" });
    });
  }

  deleteProduct(req, res) {
    const productId = parseInt(req.params.id);

    this.productModel.deleteProduct(productId, (err, changes) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      if (changes === 0) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    });
  }
}

module.exports = ProductController;
