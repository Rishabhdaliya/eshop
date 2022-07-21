const auth = require("../middlewares/auth");

module.exports = (app) => {
  const router = require("express").Router();
  const address = require("../controllers/address.controller");

  router.post("/add-address", address.addAddress);

  app.use("/api/addresses", router);
};
