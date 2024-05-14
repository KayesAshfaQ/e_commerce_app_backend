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

// create a post request route to rate the product
productRouter.post("/api/products/rate", auth, async (req, res) => {
  try {
    const { id, rating } = req.body;

    // find the product by id from the database
    let product = await Product.findById(id);

    // if the product is not found then send error response
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // if the user has already rated the product then remove the rating
    for (let i = 0; i < product.ratings.length; i++) {
      if (product.ratings[i].userId === req.user) {
        product.ratings.splice(i, 1);
        break;
      }
    }

    // add the rating
    const ratingObj = {
      userId: req.user,
      rating,
    };

    // add the rating to the product and save it
    product.ratings.push(ratingObj);
    product = await product.save();

    // send the response
    res.status(201).json({ message: "Product has been rated", product });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = productRouter;
