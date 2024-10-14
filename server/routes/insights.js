const express = require("express");
const router = express.Router();
const insightController = require("../controllers/insightsController");

router.get("/search", insightController.getInsights);

module.exports = router;
