const express = require("express");
const router = express.Router();
const LikeController = require("../controllers/like.controller");

router.get("/", LikeController.getAll);
router.get("/tip/:tip_id", LikeController.getAllByTipId);
router.get("/user/:user_id", LikeController.getAllByUserId);
router.post("/", LikeController.createOne);
router.delete("/", LikeController.deleteOne);
router.delete("/tip", LikeController.deleteAllByTipId);

module.exports = router;
