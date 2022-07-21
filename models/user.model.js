const { model } = require("mongoose");
const validator = require("validator");

module.exports = (mongoose) => {
  let User = mongoose.model(
    "user",
    mongoose.Schema(
      {
        firstName: { type: String, trim: true, required: true },
        lastName: String,
        email: {
          type: String,
          unique: true,
          trim: true,
          lowercase: true,
          validate(value) {
            if (!validator.isEmail(value)) {
              throw new Error("Email is invalid");
            }
          },
        },
        password: { type: String, trim: true, required: true },
        contactNumber: { type: String },
        role: { type: String, default: "user" },
      },
      { timestamps: true }
    )
  );
  return User;
};
