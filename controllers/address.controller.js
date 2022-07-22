const db = require("../models/index");
const Address = db.address;
const validator = require("validator");
const e = require("express");
const User = db.user;

exports.addAddress = (req, res) => {
  let zip = req.body.zipcode.length;
  if (
    !req.body.name ||
    !req.body.contactNumber ||
    !req.body.street ||
    !req.body.city ||
    !req.body.state ||
    !req.body.zipcode
  ) {
    res.status(400).send({ message: "Provide all details for Address" });
  } else if (zip !== 6) {
    console.log(">>", zip);
    res.status(400).send({ message: "Invalid zip code!" });
  } else {
    User.findOne({ contactNumber: req.body.contactNumber }, (err, user) => {
      const address = new Address({
        name: req.body.name,
        contactNumber: req.body.contactNumber,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        landmark: req.body.landmark,
        user: user,
      });
      address
        .save(address)
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
          console.log(err);
          return;
        });
    });
  }
};
