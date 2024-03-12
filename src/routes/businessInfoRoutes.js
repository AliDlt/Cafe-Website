const express = require("express");
const router = express.Router();
const BusinessInfoController = require("../controllers/businessInfoController");

// Instantiate BusinessInfoController with the path to your database file
const businessInfoController = new BusinessInfoController("../database.db");

// Routes for business info
router.get(
  "/business",
  businessInfoController.getBusinessInfo.bind(businessInfoController)
);

router.put(
  "/business",
  businessInfoController.updateBusinessInfo.bind(businessInfoController)
);

module.exports = router;
