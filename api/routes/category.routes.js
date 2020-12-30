const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category.controller");

router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getById);
// router.get("/tip/:tip_id", CategoryController.getAllByTipId);
router.post("/", CategoryController.createOne);
router.put("/:id", CategoryController.updateOne);
router.delete("/:id", CategoryController.deleteOne);

module.exports = router;