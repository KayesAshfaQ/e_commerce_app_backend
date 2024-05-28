const mongoose = require("mongoose");
const { productSchema } = require("./product");

const cartSchema = mongoose.Schema({
  product: productSchema,
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = cartSchema;
