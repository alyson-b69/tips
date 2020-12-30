const Tip_CategoryModel = require("../models/tip_category.model");

class Tip_CategoryController {
  static getAll(req, res) {
    Tip_CategoryModel.findAll((err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(results);
    });
  }

  static getAllByTipId(req, res) {
    Tip_CategoryModel.findByTipId(
      [parseInt(req.params.tip_id)],
      (err, result) => {
        if (err) {
          res.status(500).send(JSON.stringify({ err }));
        } else {
          res.status(200).send(result);
        }
      }
    );
  }

  static createOne(req, res) {
    Tip_CategoryModel.create(req.body, (err, results) => {
      if (err) {
        res.status(500).send(JSON.stringify({ err }));
      }
      res.status(201).json(results);
    });
  }

  static deleteOne(req, res) {
    Tip_CategoryModel.deleteBy(
      [req.params.user_id, req.params.tip_id],
      (err, results) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(202).send(results);
      }
    );
  }

  static deleteOneByTipId(req, res) {
    Tip_CategoryModel.deleteByTipId(
      [parseInt(req.body.tip_id)],
      (err, results) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(202).send(results);
      }
    );
  }
}

module.exports = Tip_CategoryController;
