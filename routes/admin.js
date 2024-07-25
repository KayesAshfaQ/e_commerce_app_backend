const express = require("express");

const admin = require("../middlewares/admin");
const { Product } = require("../models/product");
const Order = require("../models/order");

const adminRouter = express.Router();

// add new products
adminRouter.post("/admin/add-product", admin, async (req, res) => {
  try {
    const { name, description, images, stock, price, category } = req.body;

    let product = new Product({
      name,
      description,
      images,
      stock,
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

// get all orders
adminRouter.get("/admin/all-orders", admin, async (req, res) => {
  try {
    const orders = await Order.find({});

    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// update order status by id
adminRouter.post("/admin/update-order-status", admin, async (req, res) => {
  try {
    const { id, status } = req.body;

    let order = await Order.findById(id);
    order.status = status;
    order = await order.save();

    res.status(201).json({
      message: "Order status updated successfully",
      order: {
        id: order.id,
        status: order.status,
      },
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// analytics
adminRouter.get("/admin/orders-analytics", admin, async (req, res) => {
  try {
    const orders = await Order.find({});

    let totalOrders = orders.length;
    let totalDeliveredOrders = 0;
    let totalPendingOrders = 0;
    let totalCancelledOrders = 0;
    let totalEarnings = 0;

    for (let i = 0; i < orders.length; i++) {
      switch (orders[i].status.toString().toLowerCase()) {
        case "pending": {
          totalPendingOrders++;
          break;
        }
        case "delivered": {
          totalDeliveredOrders++;

          // earnings form the orders are completed
          totalEarnings += orders[i].totalPrice;
          break;
        }
        case "cancelled": {
          totalCancelledOrders++;
          break;
        }
      }
    }

    res.status(200).json({
      totalOrders,
      totalDeliveredOrders,
      totalPendingOrders,
      totalCancelledOrders,
      totalEarnings,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = adminRouter;
