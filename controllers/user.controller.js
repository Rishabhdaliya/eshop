const db = require("../models/index");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signUp = (req, res) => {
  console.log("reached signup");
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: "Provide Email and password" });
  } else {
    User.findOne({ email: req.body.email }, (err, data) => {
      const salt = bcrypt.genSaltSync(10);
      const encryptedPassword = bcrypt.hashSync(req.body.password, salt);
      if (data === null) {
        const user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: encryptedPassword,
          email: req.body.email,
          contactNumber: req.body.contactNumber,
        });
        user
          .save(user)
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
            console.log({ err });
            return;
          });
      } else {
        console.log("here");
        res.status(400).send({
          message: "User Already Exist",
        });
        return;
      }
    });
  }
};

exports.login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: "Provide Email and password" });
  }
  User.findOne({ email: req.body.email }, (err, data) => {
    if (data === null) {
      res.status(404).send({ message: "This email has not been registered!" });
    } else if (bcrypt.compareSync(req.body.password, data.password)) {
      const token = jwt.sign({ _id: data._id }, "secret");
      data.token = token;

      const response = {
        name: data.firstName + " " + data.lastName,
        email: data.email,
        isAuthenticated: true,
        role: data.role,
      };

      res.status(200).send({
        message: "LoggedIn succesfully",
        data: response,
        token: token,
      });
    } else {
      res.status(401).send({ message: "Invalid Credentials!" });
    }
    return;
  });
};
