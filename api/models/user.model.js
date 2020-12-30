const db = require("../config/db");

class UserModel {
  static findAll(callback) {
    db.query(
      "SELECT id, username, firstname, lastname, email, created_at, updated_at FROM user WHERE is_active = 1 ORDER BY username ASC",
      callback
    );
  }

  static findAllWithoutOne(where, callback) {
    db.query(
      "SELECT id, username, firstname, lastname, email, created_at, updated_at FROM user WHERE id <> ? AND is_active = 1 ORDER BY username ASC",
      [where, where],
      callback
    );
  }


  static findBy(where, callback) {
    db.query(
      "SELECT id, username, firstname, lastname, email, created_at, updated_at FROM user WHERE username = ? OR email = ? AND is_active = 1",
      where,
      callback
    );
  }

  static findById(where, callback) {
    db.query(
      "SELECT id, username, firstname, lastname, email, created_at, updated_at FROM user WHERE ? AND is_active = 1",
      where,
      callback
    );
  }


  static findByLogin(body, callback) {
    db.query(
      "SELECT id, username, firstname, lastname, email, created_at, updated_at FROM user WHERE username = ? AND password = ? AND is_active = 1",
      body,
      callback
    );
  }

  static create(data, callback) {
    db.query("INSERT INTO user SET ?", data, callback);
  }

  static updateBy(data, where, callback) {
    db.query("UPDATE user SET ? WHERE ?", [data, where], callback);
  }

  static deleteBy(where, callback) {
    db.query("DELETE FROM user WHERE ?", where, callback);
  }
}

module.exports = UserModel;
