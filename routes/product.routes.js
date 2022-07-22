const auth = require("../middlewares/auth");

module.exports = (app) => {
  const router = require("express").Router();
  const product = require("../controllers/product.controller");

  router.post("/", product.addProduct);
  router.get("/all_products", product.allProducts);
  router.get("/:id", product.productById);
  router.put("/update/:_id", product.updateById);
  router.delete("/delete/:_id", product.deleteById);
  router.get("/category", product.productByCategory);

  app.use("/api/products", auth, router);
};
