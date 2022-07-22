const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = 8080;
const cors = require("cors");
const db = require("./models/index");
const dotenv = require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
console.log(db);

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("error>", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.status(200).send("successfully running");
});

require("./routes/user.routes")(app);
require("./routes/address.routes")(app);
require("./routes/product.routes")(app);
require("./routes/order.routes")(app);

app.listen(PORT, () => {
  console.log("server connected");
});
