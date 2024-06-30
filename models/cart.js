const mongoose = require("mongoose");
const { productSchema } = require("./product");

const cartSchema = mongoose.Schema({
  product: productSchema,
  quantity: {
    required: true,
    type: Number,
  },
});

module.exports = cartSchema;
