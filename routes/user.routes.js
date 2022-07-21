const auth = require("../middlewares/auth");
module.exports = (app) => {
  router = require("express").Router();
  const user = require("../controllers/user.controller");

  router.post("/sign-up", user.signUp);
  router.post("/auth", user.login);

  app.use("/api/user", router);
};
