const express = require("express");


const auth = require("../middlewares/auth");
const { Product } = require("../models/product");

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

    // add the rating to the product ratings and save it
    product.ratings.push(ratingObj);
    product = await product.save();

    // send the response
    res.status(201).json({ message: "Product has been rated", product });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// deal of the day (highest rated product)
productRouter.get("/api/deal-of-the-day", auth, async (req, res) => {
  try {

    // fetch all the products
    let product = await Product.find({});

    // sort products based on their ratings
    product.sort((a, b) => {
      let aSum = 0;
      let bSum = 0;

      for (let i = 0; i < a.ratings.length; i++) {
        aSum += a.ratings[i].rating;
      }

      for (let i = 0; i < b.ratings.length; i++) {
        bSum += b.ratings[i].rating;
      }

      return aSum > bSum ? -1 : 1;
    });

    // return the highest ratted product (first item of sorted product) 
    res.json(product[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = productRouter;
