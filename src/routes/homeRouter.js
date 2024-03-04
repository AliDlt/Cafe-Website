const express = require("express");
const homeRouter = express.Router();

const { readDataFromFile, writeDataToFile } = require("../utils/jsonUtils");

homeRouter.get("/", async (req, res) => {
  const data = await readDataFromFile("data.json");

  res.render("layouts/layout", {
    mainContent: "../pages/home",
    businessName: data.businessInfo.name,
    logo: data.businessInfo.logo,
  });
});

module.exports = homeRouter;
