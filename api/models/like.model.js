const db = require("../config/db");

class LikeModel {
  static findAll(callback) {
    db.query("SELECT tip_id, user_id FROM user_like_tip", callback);
  }

  static findByTipId(where, callback) {
    db.query(
      "SELECT P.tip_id, P.user_id, U.username FROM user_like_tip AS P INNER JOIN user AS U ON P.tip_id = ? AND U.id=P.user_id AND U.is_active = 1 ORDER BY U.username ASC",
      where,
      callback
    );
  }

  static findByUserId(where, callback) {
    db.query(
      "SELECT L.tip_id AS tip_id, L.user_id AS likeUserId, T.title, T.slug, T.body, T.created_at, T.updated_at, T.author_id, U.username, T.published FROM user_like_tip AS L INNER JOIN tip AS T ON L.tip_id = T.id AND T.published = 1 AND L.user_id = ? INNER JOIN user AS U on T.author_id = U.id ORDER BY T.created_at DESC",
      where,
      callback
    );
  }

  static create(data, callback) {
    db.query(
      "INSERT INTO user_like_tip(tip_id, user_id) SELECT ?,? FROM user_like_tip WHERE NOT EXISTS (SELECT * FROM user_like_tip WHERE tip_id=? AND user_id=?) LIMIT 1",
      data,
      callback
    );
  }

  static deleteBy(where, callback) {
    db.query(
      "DELETE FROM user_like_tip WHERE user_id = ? AND tip_id = ?",
      where,
      callback
    );
  }

  static deleteByTipId(where, callback) {
    db.query("DELETE FROM user_like_tip WHERE tip_id = ?", where, callback);
  }
}

module.exports = LikeModel;
