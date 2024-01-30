const express = require("express");

const Product = require("../models/product");
const admin = require("../middlewares/admin");

const adminRouter = express.Router();

adminRouter.post("/admin/add-product", admin, async (req, res) => {
  try {
    const { name, description, images, quantity, price, category } = req.body;

    let product = new Product({
      name,
      description,
      images,
      quantity,
      price,
      category,
    });

    product = await product.save();

    // exclude __v and show the rest of the fields
    product = await product.toJSON();
    delete product.__v;

    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = adminRouter;
