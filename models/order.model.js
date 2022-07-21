module.exports = (mongoose) => {
  let Order = mongoose.model(
    "Order",
    mongoose.Schema({
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      addressId: {
        type: mongoose.Schema.Types.ObjectId,

        ref: "address",
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,

        ref: "user",
      },
      user: {
        type: Object,
      },
      product: {
        type: Object,
      },
      shippingAddress: {
        type: Object,
      },
      quantity: Number,
      amount: Number,
      orderDate: { type: Date, default: Date.now },
    })
  );
  return Order;
};
