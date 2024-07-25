const mongoose = require("mongoose");
const ratingSchema = require("./rating");

const productSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  description: {
    required: true,
    type: String,
    trim: true,
  },
  images: [
    {
      required: true,
      type: String,
    },
  ],
  stock: {
    required: true,
    type: Number,
  },
  price: {
    required: true,
    type: Number,
  },
  // TODO: create a category schema and use it here
  category: {
    required: true,
    type: String,
  },
  ratings: [
    ratingSchema,
  ],
});

const Product = mongoose.model("Product", productSchema);
module.exports = { Product, productSchema };