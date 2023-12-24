const Shop = require("../model/shop")
const ErrorHandler = require("../utils/ErrorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const express = require("express")
const {isSellerAuthenticated, isAuthenticated, isAdmin} = require("../middleware/auth")
const Withdraw = require("../model/withdraw")
const sendMail = require("../utils/sendMail")
const withdraw = require("../model/withdraw")
const router = express.Router()

// create withdraw request --- only for seller
router.post("/create-withdraw-request", isSellerAuthenticated, catchAsyncError(async(req,res,next) => {
    try{
        const {amount} = req.body

        const data = {
            seller: req.seller,
            amount
        }

        try{
            await sendMail({
                email: req.seller.email,
                subject: "Withdraw Request",
                message: `Hello ${req.seller.name}, Your ${amount}$ is processing. it will take 3 days to 7 days to processing!`
            })
            res.status(201).json({
                success:true,
            })
        }catch(error){
            return next(new ErrorHandler(error.message, 500))
        }

        const withdraw = await Withdraw.create(data)

        const shop = await Shop.findById(req.seller._id);

        shop.availableBalance = shop.availableBalance - amount

        await shop.save()

    }catch(error){
        return next(new ErrorHandler(error.message, 500))
    }
}))

// get all withdraws --- admin
router.get("/get-all-withdraw-request", isAuthenticated, isAdmin("Admin"), catchAsyncError(async (req,res,next) => {
    try{
        const withdraws = await Withdraw.find().sort({createdAt: -1});

        res.status(201).json({
            success:true,
            withdraws
        })

    }catch(error){
        return next(new ErrorHandler(error.message, 500))
    }
}))

// update withdraw request ----------- admin
router.put("/update-withdraw-request/:id", isAuthenticated, isAdmin("Admin"), catchAsyncError(async(req,res,next) => {
    try{
        const { sellerId } = req.body

        const withdraw = await Withdraw.findByIdAndUpdate(req.params.id,{
            status: "succeed",
            updatedAt: Date.now()
        },
        {
            new: true
        })

        const seller = await Shop.findById(sellerId);

        const transactions ={
            _id: withdraw._id,
            amount: withdraw.amount,
            updatedAt: withdraw.updatedAt,
            status: withdraw.status,
        }

        seller.transactions = [...seller.transactions, transactions];

        await seller.save()

        try{
            await sendMail({
                email: seller.email,
                subject: "Payment confirmation",
                message: `Hello ${seller.name}, Your withdraw request of ${withdraw.amount}$ id on the way. Delivery time depends your bank's rules it usually takes 3days to 7days `
            })
        }catch(error){
            return next(new ErrorHandler(error.message, 500))
        }

        res.status(201).json({
            success: true,
            withdraw,
        })

    }catch(error){
        return next(new ErrorHandler(error.message, 500))
    }
}))