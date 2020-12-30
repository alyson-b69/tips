const db = require("../config/db");

class Tip_CategoryModel {
  static findAll(callback) {
    db.query("SELECT tip_id, category_id FROM tip_category", callback);
  }

  static findByTipId(where, callback) {
    db.query(
      "SELECT C.id, C.name FROM tip_category AS T INNER JOIN category AS C ON T.category_id = C.id AND T.tip_id = ?",
      where,
      callback
    );
  }

  static create(data, callback) {
    db.query("INSERT INTO tip_category SET ?", data, callback);
  }

  static deleteByTipId(where, callback) {
    db.query("DELETE FROM tip_category WHERE tip_id = ?", where, callback);
  }

  static deleteBy(where, callback) {
    db.query(
      "DELETE FROM tip_category WHERE tip_id = ? AND category_id = ?",
      where,
      callback
    );
  }
}

module.exports = Tip_CategoryModel;
