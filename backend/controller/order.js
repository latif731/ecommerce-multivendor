const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const { isAuthenticated, isSellerAuthenticated, isAdmin } = require("../middleware/auth");
const Order = require("../model/order");
const Shop = require("../model/shop");
const Product = require("../model/product");

// create new order
router.post(
  "/create-order",
  catchAsyncError(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

      //   group cart items by shopId
      const shopItemsMap = new Map();

      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }

      // create an order for each shop
      const orders = []; 

      for (const [shopId, items] of shopItemsMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }

      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      // return next(new ErrorHandler(error.message, 500));
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  })
);

// get all orders of user
router.get(
  "/get-all-orders/:userId",
  catchAsyncError(async (req, res, next) => {
    try {
      const orders = await Order.find({ "user._id": req.params.userId }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      // return next(new ErrorHandler(error.message, 500));
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  })
);

// get all orders of seller
router.get(
  "/get-seller-all-orders/:shopId",
  catchAsyncError(async (req, res, next) => {
    try {
      const orders = await Order.find({
        "cart.shopId": req.params.shopId,
      }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      // return next(new ErrorHandler(error.message, 500));
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  })
);

// update order status for seller
router.put(
  "/update-order-status/:id",
  isSellerAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }
      if (req.body.status === "Transferred to delivery partner") {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      order.status = req.body.status;

      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "Succeeded";
        const serviceCharge = order.totalPrice * .10;
        await updateSellerInfo(order.totalPrice - serviceCharge);
      }

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
      });

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock -= qty;
        product.sold_out += qty;

        await product.save({ validateBeforeSave: false });
      }

      async function updateSellerInfo(amount) {
        const seller = await Shop.findById(req.seller.id);
        
        seller.availableBalance = amount;

        await seller.save();
      }
    } catch (error) {
      // return next(new ErrorHandler(error.message, 500));
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  })
);

// give a refund ----- user
router.put(
  "/order-refund/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        // return next(new ErrorHandler("Order not found with this id", 400));
        res.status(400).json({
          success: false,
          message: "Order not found with this id",
        });
      }

      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
        message: "Order Refund Request successfully!",
      });
    } catch (error) {
      // return next(new ErrorHandler(error.message, 500));
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  })
);

// accept the refund ---- seller
router.put(
  "/order-refund-success/:id",
  isSellerAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        // return next(new ErrorHandler("Order not found with this id", 400));
        res.status(400).json({
          success: false,
          message: "Order not found with this id",
        });
      }

      order.status = req.body.status;

      await order.save();

      res.status(200).json({
        success: true,
        message: "Order Refund successfull!",
      });

      if (req.body.status === "Refund Success") {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock += qty;
        product.sold_out -= qty;

        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {
      // return next(new ErrorHandler(error.message, 500));
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  })
);

// all orders --- for admin
router.get(
  "/admin-all-orders",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const orders = await Order.find().sort({
        deliveredAt: -1,
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      // return next(new ErrorHandler(error.message, 500));
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  })
);

module.exports = router;
