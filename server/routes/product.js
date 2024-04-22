const express = require("express");

const Product = require("../models/product");
const auth = require("../middlewares/auth");

const productRouter = express.Router();

// get products by category
// api/products?category='books'
productRouter.get("/api/products", auth, async (req, res) => {
  try {
    const products = await Product.find({category: req.query.category});

    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = productRouter;
