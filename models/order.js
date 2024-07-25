const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  // user id
  user: {
    type: String,
    required: true,
  },

  // product id & quantity
  products: [
    {
      id: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],

  // total price
  totalPrice: {
    type: Number,
    required: true,
  },

  // order date
  orderDate: {
    type: Date,
    default: Date.now,
  },

  // delivery date
  deliveryDate: {
    type: Date,
  },

  // delivery address
  address: {
    type: String,
    required: true,
  },

  // status
  status: {
    type: String,
    enum: ["pending", "delivered", "cancelled"],
    default: "pending",
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
