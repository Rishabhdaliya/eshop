const auth = require("../middlewares/auth");
module.exports = (app) => {
  router = require("express").Router();
  const order = require("../controllers/order.controller");

  router.post("/orders", order.order);

  app.use("/api", router);
};
