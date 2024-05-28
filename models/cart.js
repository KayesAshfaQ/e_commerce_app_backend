const mongoose = require("mongoose");
const { productSchema } = require("./Product");

const cartSchema = mongoose.Schema({
  product: productSchema,
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = cartSchema;
