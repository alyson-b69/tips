const express = require("express");
const router = express.Router();
const TipController = require("../controllers/tip.controller");
const Tip_CategoryController = require("../controllers/tip_category.controller");

router.get("/tip", TipController.getAll);
router.get("/tip_category/tip/:tip_id", Tip_CategoryController.getAllByTipId);
router.get("/category/:category_id", TipController.getAllByCategoryId);

module.exports = router;
