const express = require("express");

const Product = require("../models/product");
const auth = require("../middlewares/auth");

const productRouter = express.Router();

// get products by category
// api/products?category='books'
productRouter.get("/api/products", auth, async (req, res) => {
  try {
    const products = await Product.find({ category: req.query.category });

    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// search products by name
// api/products/search?name='book'
productRouter.get("/api/products/search", auth, async (req, res) => {
  try {
    const products = await Product.find({
      name: {
        $regex: req.query.name,
        $options: "i",
      },
    });

    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = productRouter;
