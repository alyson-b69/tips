const CategoryModel = require("../models/category.model");

class CategoryController {
  static getAll(req, res) {
    CategoryModel.findAll((err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(results);
    });
  }

  static getById(req, res) {
    CategoryModel.findById({ id: parseInt(req.params.id) }, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(results);
    });
  }

  static createOne(req, res) {
    CategoryModel.create(req.body, (err, results) => {
      if (err) {
        res.status(500).send(JSON.stringify({ err }));
      }
      res.status(201).json(`${req.body.name} category has been created !`);
    });
  }

  static updateOne(req, res) {
    CategoryModel.updateBy(req.body, { id: req.params.id }, (err, results) => {
      if (err) {
        res.status(500).send(JSON.stringify({ err }));
      }
      res.status(202).json(`${req.body.name} category has been updated !`);
    });
  }

  static deleteOne(req, res) {
    CategoryModel.deleteBy({ id: req.params.id }, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(202).send(`This category is delete : ${req.params.id}`);
    });
  }
}

module.exports = CategoryController;
