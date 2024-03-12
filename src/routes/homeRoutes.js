const BusinessInfoModel = require("../models/businessInfoModel");
const CategoryModel = require("../models/categoryModel");
const ProductModel = require("../models/productModel");

const express = require("express");
const homeRouter = express.Router();

const businessInfoModel = new BusinessInfoModel("../database.db");
const categoryModel = new CategoryModel("../database.db");
const productModel = new ProductModel("../database.db");

homeRouter.get("/", async (req, res) => {
  businessInfoModel.getBusinessInfo((err, businessInfo) => {
    if (err) {
      console.error("Error fetching business info:", err);
      return res.status(500).send("Internal server error");
    }
    res.render("layouts/layout", {
      mainContent: "../pages/home",
      businessName: businessInfo.name,
      logo: businessInfo.logo,
    });
  });
});

homeRouter.get("/menu", async (req, res) => {
  categoryModel.getAllCategories((err, category) => {
    if (err) {
      console.error("Error fetching category :", err);
      return res.status(500).send("Internal server error");
    }
    productModel.getAllProducts((err, product) => {
      if (err) {
        console.error("Error fetching category :", err);
        return res.status(500).send("Internal server error");
      }
      res.render("layouts/layout", {
        mainContent: "../pages/menu",
        data: null,
      });
    });
  });
});

module.exports = homeRouter;
