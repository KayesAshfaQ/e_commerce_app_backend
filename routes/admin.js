const express = require("express");

const admin = require("../middlewares/admin");
const { Product } = require("../models/product");

const adminRouter = express.Router();

// add new products
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

// get all products
adminRouter.get("/admin/all-products", admin, async (req, res) => {
  try {
    let products = await Product.find({});

    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// delete a product by id
adminRouter.delete("/admin/delete-product/:id", admin, async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: {
        id: product.id,
        name: product.name,
        category: product.category,
      },
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = adminRouter;
