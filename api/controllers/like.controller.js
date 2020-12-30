const LikeModel = require("../models/like.model");

class LikeController {
  static getAll(req, res) {
    LikeModel.findAll((err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(results);
    });
  }

  static getAllByTipId(req, res) {
    LikeModel.findByTipId([parseInt(req.params.tip_id)], (err, result) => {
      if (err) {
        res.status(500).send(JSON.stringify({ err }));
      } else {
        res.status(200).send(result);
      }
    });
  }

  static getAllByUserId(req, res) {
    LikeModel.findByUserId([parseInt(req.params.user_id)], (err, result) => {
      if (err) {
        res.status(500).send(JSON.stringify({ err }));
      } else {
        res.status(200).send(result);
      }
    });
  }

  static createOne(req, res) {
    LikeModel.create(
      [
        parseInt(req.body.tip_id),
        parseInt(req.body.user_id),
        parseInt(req.body.tip_id),
        parseInt(req.body.user_id),
      ],
      (err, results) => {
        if (err) {
          res.status(500).send(JSON.stringify({ err }));
        }
        res.status(201).json(results);
      }
    );
  }

  static deleteOne(req, res) {
    LikeModel.deleteBy(
      [req.params.user_id, req.params.tip_id],
      (err, results) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(202).send(results);
      }
    );
  }

  static deleteAllByTipId(req, res) {
    LikeModel.deleteByTipId([parseInt(req.body.tip_id)], (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(202).send(`Dislikes`);
    });
  }
}

module.exports = LikeController;
