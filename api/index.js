const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const server = require("http").createServer(app);

const port = process.env.HTTP_PORT;
const bodyParser = require("body-parser");
const isAuthenticated = require("./middlewares/isAuthenticated");

const user = require("./routes/user.routes.js");
const subscribe = require("./routes/subscribe.routes.js");
const login = require("./routes/login.routes.js");
const only_view = require("./routes/only_view.routes.js");
const category = require("./routes/category.routes.js");
const tip = require("./routes/tip.routes.js");
const like = require("./routes/like.routes.js");
const tip_category = require("./routes/tip_category.routes.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(isAuthenticated);
app.use("/user", user);
app.use("/subscribe", subscribe);
app.use("/login", login);
app.use("/only_view", only_view);
app.use("/category", category);
app.use("/tip", tip);
app.use("/like", like);
app.use("/tip_category", tip_category);

server.listen(port, () => {
  console.info(`Server listening on port : ${port}`);
});
