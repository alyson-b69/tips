const db = require("../config/db");

class CategoryModel {
  static findAll(callback) {
    db.query("SELECT id, name FROM category ORDER BY name ASC", callback);
  }

  static findById(where, callback) {
    db.query("SELECT id, name FROM category WHERE ?", where, callback);
  }

  static create(data, callback) {
    db.query("INSERT INTO category SET ?", data, callback);
  }

  static updateBy(data, where, callback) {
    db.query("UPDATE category SET ? WHERE ?", [data, where], callback);
  }

  static deleteBy(where, callback) {
    db.query("DELETE FROM category WHERE ?", where, callback);
  }
}

module.exports = CategoryModel;
