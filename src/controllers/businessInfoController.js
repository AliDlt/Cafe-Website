const BusinessInfoModel = require("../models/businessInfoModel");

class BusinessInfoController {
  constructor(dbFilePath) {
    this.businessInfoModel = new BusinessInfoModel(dbFilePath);
  }

  getBusinessInfo(req, res) {
    this.businessInfoModel.getBusinessInfo((err, businessInfo) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json(businessInfo);
    });
  }

  updateBusinessInfo(req, res) {
    const updatedData = req.body;

    this.businessInfoModel.updateBusinessInfo(
      updatedData,
      (err, businessInfoId) => {
        if (err) {
          return res.status(500).json({ error: "Internal server error" });
        }
        res.json({ id: businessInfoId, ...updatedData });
      }
    );
  }
}

module.exports = BusinessInfoController;
