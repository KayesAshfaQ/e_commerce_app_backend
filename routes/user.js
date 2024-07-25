const express = require("express");

const userRouter = express.Router();
const auth = require("../middlewares/auth");
const User = require("../models/user");
const Order = require("../models/order");
const { Product } = require("../models/product");

// GET USER DATA API
userRouter.get("/", auth, async (req, res) => {
  try {
    // find the user data
    const user = await User.findById(req.user);

    // if user data not available
    if (!user) {
      return res.status(400).json({ message: "user does not exist" });
    }

    //res.json({ ...user._doc, token: req.token });
    return res.json({
      name: user.name,
      email: user.email,
      address: user.address,
      type: user.type,
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// add product on cart
userRouter.post("/api/add-to-cart", auth, async (req, res) => {
  try {
    const { id } = req.body;
    let user = await User.findById(req.user);
    const product = await Product.findById(id);

    // if the the cart is empty, add the product to the cart
    if (user.cart.length == 0) {
      user.cart.push({ product, quantity: 1 });
    } else {
      // flag to check if product is already exist in the cart
      let isProductExist = false;

      for (let i = 0; i < user.cart.length; i++) {
        // if product is already exist by comparing the product id with the cart products id, increase quantity
        if (user.cart[i].product._id.equals(product._id)) {
          user.cart[i].quantity += 1;
          isProductExist = true;
          break;
        }
      }

      // if product is not exist in the cart, add the product to the cart
      if (!isProductExist) {
        user.cart.push({ product, quantity: 1 });
      }
    }

    // save the user
    await user.save();

    // send the response
    res.status(201).json({
      message: "Product has been added to cart",
      data: user.cart,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// remove product form cart
userRouter.delete("/api/remove-from-cart", auth, async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);

    let user = await User.findById(req.user);

    for (var i = 0; i < user.cart.length; i++) {
      // check if the product id is equal to the user cart product id
      if (user.cart[i].product._id.equals(product._id)) {
        // remove the product from the cart array
        user.cart.splice(i, 1);
        break;
      } else {
        return res
          .status(400)
          .json({ message: "Product does not exist in cart" });
      }
    }

    // save the user
    await user.save();

    // send the response
    res.status(200).json({
      message: "Product has been removed from cart",
      data: user.cart,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// update product quantity in cart
userRouter.patch("/api/update-cart-quantity", auth, async (req, res) => {
  try {
    const { id, quantity } = req.body;
    const product = await Product.findById(id);

    let user = await User.findById(req.user);

    for (var i = 0; i < user.cart.length; i++) {
      // check if the product id is equal to the user cart product id
      if (user.cart[i].product._id.equals(product._id)) {
        // check if the requested quantity is more than the available stock
        if (product.stock < quantity) {
          return res.status(400).json({ message: "Insufficient stock" });
        }

        // update the product quantity
        user.cart[i].quantity = quantity;
        break;
      } else {
        return res
          .status(400)
          .json({ message: "Product does not exist in cart" });
      }
    }

    // save the user
    await user.save();

    // send the response
    res.status(200).json({
      message: "Product quantity has been updated",
      data: user.cart,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// get all user orders
userRouter.get("/api/orders/me", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user });
    res.status(200).json(orders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = userRouter;
