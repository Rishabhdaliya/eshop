const db = require("../models/index");
const Address = db.address;
const validator = require("validator");

exports.addAddress = (req, res) => {
  if (
    !req.body.name ||
    !req.body.contactNumber ||
    !req.body.street ||
    !req.body.city ||
    !req.body.state ||
    !req.body.zipcode
  ) {
    res.status(400).send({ message: "Provide all details for Address" });
  } else {
    const address = new Address({
      name: req.body.name,
      contactNumber: req.body.contactNumber,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
      landmark: req.body.landmark,
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
  }
};
