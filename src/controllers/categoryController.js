const CategoryModel = require("../models/categoryModel");

class CategoryController {
  constructor(dbFilePath) {
    this.categoryModel = new CategoryModel(dbFilePath);
  }

  getAllCategories(req, res) {
    this.categoryModel.getAllCategories((err, categories) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json(categories);
    });
  }

  getCategoryById(req, res) {
    const categoryId = parseInt(req.params.id);

    this.categoryModel.getCategoryById(categoryId, (err, category) => {
      if (err) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    });
  }

  createCategory(req, res) {
    const categoryData = req.body;

    this.categoryModel.createCategory(categoryData, (err, categoryId) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json({ id: categoryId, ...categoryData });
    });
  }

  updateCategory(req, res) {
    const categoryId = parseInt(req.params.id);
    const updatedData = req.body;

    this.categoryModel.updateCategory(
      categoryId,
      updatedData,
      (err, changes) => {
        if (err) {
          return res.status(500).json({ error: "Internal server error" });
        }
        if (changes === 0) {
          return res.status(404).json({ error: "Category not found" });
        }
        res.json({ message: "Category updated successfully" });
      }
    );
  }

  deleteCategory(req, res) {
    const categoryId = parseInt(req.params.id);

    this.categoryModel.deleteCategory(categoryId, (err, changes) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      if (changes === 0) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json({ message: "Category deleted successfully" });
    });
  }
}

module.exports = CategoryController;
