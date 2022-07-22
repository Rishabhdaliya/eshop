const db = require("../models/index");
const User = db.user;
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization || req.headers.Authorization;

  console.log("token mid", token);

  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });
  console.log(token);
  await jwt.verify(token, "secret", (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: err });
    const user = User.findOne({
      _id: decoded._id,
      token: token,
    });
    console.log(user);
    if (!user) {
      console.log("No user found");
      throw new Error();
    }
    next();
  });
};
