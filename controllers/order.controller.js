const db = require("../models/index");
const Order = db.order;
const Product = db.product;
const User = db.user;
const Address = db.address;

exports.order = (req, res) => {
  if (
    !req.body.addressId ||
    !req.body.productId ||
    !req.body.userId ||
    !req.body.quantity
  ) {
    res.status(400).send({ message: "Provide addressId and productId" });
  } else {
    let product, address, user;
    Product.findOne({ _id: req.body.productId }, (err, productData) => {
      product = productData;
      if (err) {
        res.status(400).send({
          message: `No Product found for ID - ${req.body.productId}!`,
        });
      }
    });
    Address.findOne({ _id: req.body.addressId }, (err, addressData) => {
      address = addressData;
      if (err) {
        console.log("ad");
        res.status(400).send({
          message: `No Address found for ID - ${req.body.addressId}!`,
        });
      }
    });

    User.findOne({ _id: req.body.userId }, (err, userData) => {
      user = userData;
      if (err) {
        console.log("ad");
        res.status(400).send({
          message: `No User found for ID - ${req.body.userId}!`,
        });
      }

      // Create order
      console.log({ user });
      console.log({ product });
      console.log({ address });

      const order = new Order({
        user: user,
        product: product,
        shippingAddress: address,
        quantity: req.body.quantity,
        amount: req.body.quantity * 5000,
      });
      order
        .save(order)
        .then((response) => {
          res.status(200).send({
            message: "Successfully created new order",
            data: response,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Something went wrong Try again later",
          });
          console.log({ err });
          return;
        });
    });
  }
};
