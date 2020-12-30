const { JWTRead } = require("../lib/JWT");
const excludedRoutesFromAuth = [
  "login",
  "subscribe",
  "isTokenValid",
  "only_view",
];
const isAuthenticated = (req, res, next) => {
  if (excludedRoutesFromAuth.includes(req.url.split("/")[1])) {
    next();
  } else {
    if (req.headers.token !== undefined) {
      JWTRead(req.headers.token, (err, payload) => {
        if (err) {
          res.status(401).send("error token");
        } else {
          next();
        }
      });
    } else {
      res.status(401).send("token is undefined");
    }
  }
};
module.exports = isAuthenticated;
