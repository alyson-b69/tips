const express = require("express");
const router = express.Router();
const TipController = require("../controllers/tip.controller");

router.get("/", TipController.getAll);
router.get("/id/:id", TipController.getById);
router.get("/:slug", TipController.getBySlug);
router.get("/author/:author_id", TipController.getByAuthorId);
router.post("/", TipController.createOne);
router.put("/:id", TipController.updateOne);
router.delete("/", TipController.deleteOne);

module.exports = router;
