const { model } = require("mongoose");
var pincodeDirectory = require("india-pincode-lookup");

module.exports = (mongoose) => {
  let Address = mongoose.model(
    "Address",
    mongoose.Schema({
      name: String,
      contactNumber: Number,
      street: String,
      landmark: String,
      manufacturer: String,
      city: String,
      state: String,
      zipcode: String,
      user: {
        type: Object,
      },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    })
  );
  return Address;
};
