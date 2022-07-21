const { response } = require("express");
const db = require("../models/index");
const Product = db.product;

exports.addProduct = (req, res) => {
  if (
    !req.body.name ||
    !req.body.category ||
    !req.body.price ||
    !req.body.description ||
    !req.body.availableItems ||
    !req.body.manufacturer ||
    !req.body.image
  ) {
    res.status(400).send({ message: "Provide all details for Products" });
  } else {
    const product = new Product({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
      manufacturer: req.body.manufacturer,
      availableItems: req.body.availableItems,
      imageUrl: req.body.image,
    });
    product
      .save(product)
      .then((response) => {
        res.status(200).send({
          message: "Successfully created new User",
          data: response,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Something went wrong Try again later",
        });
        return;
      });
  }
};

exports.allProducts = (req, res) => {
  Product.find({}, (err, data) => {
    if (!data) {
      res.status(404).send({ message: `No Product ` });
    } else {
      res.status(200).send({ message: "Found product", data: data });
    }
  });
};

exports.productById = (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    res.status(400).send({ message: "No Product found for ID - <id>!" });
  } else {
    Product.findOne({ _id: productId }, (err, data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `No Product found for ID - ${productId}` });
      } else {
        res.status(200).send({ message: "Found product", data: data });
      }
    });
  }
};

exports.updateById = (req, res) => {
  console.log("update");
  const productId = req.params._id;
  console.log(productId);
  if (!productId) {
    res.status(400).send({ message: "No Product found for ID - <id>!" });
  } else {
    Product.findByIdAndUpdate(
      { _id: productId },
      {
        $set: {
          name: req.body.name,
          category: req.body.category,
          price: req.body.price,
          description: req.body.description,
          manufacturer: req.body.manufacturer,
          availableItems: req.body.availableItems,
          imageUrl: req.body.image,
          updatedAt: Date.now(),
        },
      }
    )
      .then(() => Product.findOne({ _id: productId }))
      .then((data) => {
        if (data === null) {
          throw new Error("Cat Not Found");
        }
        res.status(200).send({
          message: `Product with ID - ${productId} updated successfully!`,
          data: data,
        });
        console.log("New Product data", data);
      })
      .catch((error) => {
        /*
          Deal with all your errors here with your preferred error handle middleware / method
       */
        res.status(500).json({ message: "Some Error!" });
        console.log(error);
      });
  }
};

exports.deleteById = (req, res) => {
  console.log("reached delete");
  const productId = req.params._id;

  if (!productId) {
    res.status(400).send({ message: "No Product found for ID - <id>!" });
  } else {
    Product.findByIdAndDelete({ _id: productId }, (err, docs) => {
      if (err) {
        console.log(err);
        res.status(400).send({
          message: `No Product found for ID - ${productId}`,
        });
      } else {
        console.log("Deleted : ", docs);
        res.status(200).send({
          message: `Product with ID - ${productId} deleted successfully!`,
          data: docs,
        });
      }
    });
  }
};
