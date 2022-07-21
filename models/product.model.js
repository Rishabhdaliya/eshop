module.exports = (mongoose) => {
  let Product = mongoose.model(
    "Product",
    mongoose.Schema({
      name: String,
      category: String,
      price: Number,
      description: String,
      manufacturer: String,
      availableItems: Number,
      imageUrl: String,
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    })
  );
  return Product;
};
