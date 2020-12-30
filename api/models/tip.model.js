const db = require("../config/db");

class TipModel {
  static findAll(callback) {
    db.query(
      "SELECT T.id as tip_id, T.author_id, U.username AS author_username, T.title, T.slug, T.body, T.created_at, T.updated_at, T.published FROM tip AS T INNER JOIN USER as U ON U.id = T.author_id AND T.published = true ORDER BY updated_at DESC",
      callback
    );
  }

  static findById(where, callback) {
    db.query(
      "SELECT id, author_id, title, slug, body, created_at, updated_at, published FROM tip WHERE ?",
      where,
      callback
    );
  }

  static findBySlug(where, callback) {
    db.query(
      "SELECT id, author_id, title, slug, body, created_at, updated_at, published FROM tip WHERE ?",
      where,
      callback
    );
  }

  static findByAuthorId(where, callback) {
    db.query(
      "SELECT T.id as tip_id, T.author_id, U.username AS author_username, T.title, T.slug, T.body, T.created_at, T.updated_at, T.published FROM tip AS T INNER JOIN USER as U ON U.id = T.author_id AND T.published = true AND T.author_id = ? ORDER BY updated_at DESC",
      where,
      callback
    );
  }

  static findByCategoryId(where, callback) {
    db.query(
      "SELECT T.id as tip_id, TC.category_id, T.author_id, U.username AS author_username, T.title, T.slug, T.body, T.created_at, T.updated_at, T.published FROM tip AS T INNER JOIN USER as U ON U.id = T.author_id AND T.published = true INNER JOIN tip_category as TC ON TC.tip_id = T.id AND TC.category_id = ? ORDER BY updated_at DESC",
      where,
      callback
    );
  }

  static create(data, callback) {
    db.query("INSERT INTO tip SET ?", data, callback);
  }

  static updateBy(data, where, callback) {
    db.query("UPDATE tip SET ? WHERE ?", [data, where], callback);
  }

  static deleteBy(where, callback) {
    db.query("DELETE FROM tip WHERE ?", where, callback);
  }
}

module.exports = TipModel;
