const express = require("express");

const userRouter = express.Router();
const auth = require("../middlewares/auth");
const User = require("../models/user");
const { Product } = require("../models/product");

// add product on cart
userRouter.post("/api/add-to-cart", auth, async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);

    let user = await User.findById(req.user);
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

      // if product is not exist in the cart then add the product in the cart
      if (!isProductExist) {
        user.cart.push({ product, quantity: 1 });
      }

      // save the user
      await user.save();
    }

    // send the response
    res.status(201).json({ message: "Product has been added to cart", user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = userRouter;
