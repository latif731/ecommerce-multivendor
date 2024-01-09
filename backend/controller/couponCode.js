const express = require("express")
const router = express.Router()
const catchAsyncError = require("../middleware/catchAsyncError")
const ErrorHandler = require("../utils/ErrorHandler")
const Shop = require("../model/shop")
const Event = require("../model/event")
const fs = require("fs")
const {isSellerAuthenticated} = require("../middleware/auth")
const CouponCode = require("../model/couponCode")

// create coupon code
// router.post("/create-coupon-code", isSellerAuthenticated,catchAsyncError(async(req,res,next)=> {
//     try{
//         const isCouponCodeExists = await CouponCode.find({name: req.body.name})

//         console.log(isCouponCodeExists)

//         if(isCouponCodeExists.length !== 0){
//             return next(new ErrorHandler("Coupon code already exists!", 400))
//         }

//         const couponCode = await CouponCode.create(req.body)

//         res.status(201).json({
//             success: true,
//             couponCode,
//         })

//     }catch(error){  
//         return next(new ErrorHandler(error, 500))
//     }
// }))
router.post(
  "/create-coupon-code",
  isSellerAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const isCouponCodeExists = await CouponCode.find({
        name: req.body.name,
      });

      console.log(req.body.name)

      if (isCouponCodeExists.length !== 0) {
        // return next(new ErrorHandler("Coupon code already exists!", 400));
        res.status(400).json({
          success: false,
          message: "Coupon code already exists!",
        });
      }

      const couponCode = await CouponCode.create(req.body);

      res.status(201).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      // return next(new ErrorHandler(error, 400));
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  })
);

// get all coupons of a shop
router.get("/get-coupon/:id", isSellerAuthenticated, catchAsyncError(async(req,res,next) => {
  try{
    const couponCodes = await CouponCode.find({shopId: {_id: req.params.id}})
    
    res.status(201).json({
      success: true,
      couponCodes
    })
  }catch(error){
    // return next(new ErrorHandler(error, 400))
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}))

// delete coupon code of a shop
router.delete("/delete-coupon/:id", isSellerAuthenticated, catchAsyncError(async(req,res,next) => {
  try{
    const couponCode = await CouponCode.findByIdAndDelete(req.params.id)

    if(!couponCode){
      return next(new ErrorHandler("Coupon code doesn't exists!", 400))
    }

    res.status(201).json({
      success: true,
      message: "Coupon code deleted successfully!",
    })

  }catch(error){
    // return next(new ErrorHandler(error, 400))
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}))


// get coupon code value by its name
router.get(
  "/get-coupon-value/:name",
  catchAsyncError(async (req, res, next) => {
    try {
      const couponCode = await CouponCode.findOne({ name: req.params.name });

      res.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      // return next(new ErrorHandler(error, 400));
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  })
);

module.exports = router 