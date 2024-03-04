const express = require("express");
const homeRouter = express.Router();

homeRouter.get("/", async (req, res) => {
  res.render("layouts/layout", {
    mainContent: "../pages/home",
    businessName: "کافه کمال",
  });
});

module.exports = homeRouter;
