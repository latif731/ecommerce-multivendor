const jwt = require("jsonwebtoken");
const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncError");
const Shop = require("../model/shop")

exports.isAuthenticated = catchAsyncErrors(async(req,res,next) => {
    const { token } = req.cookies;

    console.log("token_user" , token)


    if(!token){
        return next(new ErrorHandler("Please login to continue", 401));
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // console.log("Decoded Token", decoded)
    
        req.user = await User.findById(decoded.id);
        // console.log(req.user)
    
        next();
    }catch(error){
        console.error("JWT verification Error", error);
        return next(new ErrorHandler("Invalid token" + error.message, 400))
    }

});


exports.isSellerAuthenticated = catchAsyncErrors(async(req,res,next) => {
    const {seller_token} = req.cookies;

    console.log("token_seller" , seller_token)


    if(!seller_token){
        return next(new ErrorHandler("Please login to continue", 401));
    }

    try{
        const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

        console.log("Decoded Token", decoded)
    
        req.seller = await Shop.findById(decoded.id);
        console.log(req.seller)
        next();
    }catch(error){
        console.error("JWT verification Error", error);
        return next(new ErrorHandler("Invalid token" + error.message, 400))
    }

});


exports.isAdmin = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`${req.user.role} cannot access this resources!`))
        }
        next()
    }
}