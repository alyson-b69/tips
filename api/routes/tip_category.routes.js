const express = require("express");
const router = express.Router();
const Tip_CategoryController = require("../controllers/tip_category.controller");

router.get("/", Tip_CategoryController.getAll);
router.get("/tip/:tip_id", Tip_CategoryController.getAllByTipId);
router.post("/", Tip_CategoryController.createOne);
router.delete("/", Tip_CategoryController.deleteOne);
router.delete("/tip", Tip_CategoryController.deleteOneByTipId);

module.exports = router;
