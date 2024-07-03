const express = require("express");
const orderRouter = express.Router();

const mongoose = require("mongoose");

const auth = require("../middlewares/auth");
const Order = require("../models/order");
const User = require("../models/user");
const { Product } = require("../models/product");

// CREATE ORDER API
orderRouter.post("/api/create-order", auth, async (req, res) => {
  try {
    const { products, totalPrice, address } = req.body;

    // check if the stock is enough for each product in the order list and update the stock of the products
    for (let i = 0; i < products.length; i++) {
      const product = await Product.findById(products[i].id);
      if (product.stock < products[i].quantity) {
        return res.status(400).json({ message: "stock is not enough" });
      } else {
        product.stock -= products[i].quantity;
        await product.save();
      }
    }

    // TODO: clear the cart of the user

    const order = new Order({
      user: req.user,
      products: products,
      totalPrice,
      address,
    });

    // save the order
    await order.save();

    // send the response
    return res
      .status(201)
      .json({ message: "order created successfully", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// order details api
orderRouter.get("/api/order", auth, async (req, res) => {
  try {
    // find the order by id
    let order = await Order.findById(req.query.id);

    // check if the order exists
    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }

    // check if the user is the owner of the order or admin
    if (order.user !== req.user && req.type !== "admin") {
      return res.status(401).json({ message: "unauthorized" });
    }

    // get the products details
    const products = [];
    for (let i = 0; i < order.products.length; i++) {
      const product = await Product.findById(order.products[i].id);
      console.log(product);
      products.push({
        product,
        quantity: order.products[i].quantity,
      });
    }

    // send the response
    return res.status(200).json({
      order: {
        date: order.date,
        totalPrice: order.totalPrice,
        address: order.address,
        status: order.status,
        products,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = orderRouter;
