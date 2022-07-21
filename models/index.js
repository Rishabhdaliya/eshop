const mongoose = require("mongoose");
const dbConfig = require("../config/db.config");

const db = {};

db.url = dbConfig.url;
db.mongoose = mongoose;
db.user = require("./user.model")(mongoose);
db.address = require("./address.model")(mongoose);
db.product = require("./product.model")(mongoose);
db.order = require("./order.model")(mongoose);

module.exports = db;
