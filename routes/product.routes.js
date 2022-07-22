const auth = require("../middlewares/auth");

module.exports = (app) => {
  const router = require("express").Router();
  const product = require("../controllers/product.controller");

  router.post("/", auth, product.addProduct);
  router.get("/all_products", product.allProducts);
  router.get("/:id", product.productById);
  router.put("/update/:_id", auth, product.updateById);
  router.delete("/delete/:_id", auth, product.deleteById);
  router.get("/category", auth, product.productByCategory);

  app.use("/api/products", router);
};
