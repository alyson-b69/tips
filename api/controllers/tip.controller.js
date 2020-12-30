const TipModel = require("../models/tip.model");

class TipController {
  static getAll(req, res) {
    TipModel.findAll((err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(results);
    });
  }

  static getById(req, res) {
    TipModel.findById({ id: parseInt(req.params.id) }, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(results);
    });
  }

  static getBySlug(req, res) {
    TipModel.findBySlug({ slug: req.params.slug }, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(results);
    });
  }

  static getByAuthorId(req, res) {
    TipModel.findByAuthorId(
      [parseInt(req.params.author_id)],
      (err, results) => {
        if (err) {
          res.status(500).send(err);
        }
        res.send(results);
      }
    );
  }

  static getAllByCategoryId(req, res) {
    TipModel.findByCategoryId(
      [parseInt(req.params.category_id)],
      (err, results) => {
        if (err) {
          res.status(500).send(err);
        }
        res.send(results);
      }
    );
  }

  static createOne(req, res) {
    TipModel.create(req.body, (err, results) => {
      if (err) {
        res.status(500).send(JSON.stringify({ err }));
      }
      res.status(201).json(results);
    });
  }

  static updateOne(req, res) {
    TipModel.updateBy(req.body, { id: req.params.id }, (err, results) => {
      if (err) {
        res.status(500).send(JSON.stringify({ err }));
      }
      res.status(202).json(`'${req.body.title}' has been updated !`);
    });
  }

  static deleteOne(req, res) {
    TipModel.deleteBy({ id: req.body.tip_id }, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(202).send(`This article has been deleted : ${req.params.id}`);
    });
  }
}

module.exports = TipController;
