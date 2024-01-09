const express = require("express")
const path = require("path")
const ErrorHandler = require("../utils/ErrorHandler")
const router = express.Router()
const catchAsyncError = require("../middleware/catchAsyncError")
const fs = require("fs")
const jwt = require("jsonwebtoken")
const sendMail = require("../utils/sendMail")
const sendToken = require("../utils/jwtTokenShop")
const sendShopToken = require("../utils/jwtTokenShop")
// const { isAuthenticated } = require("../middleware/auth")
const {isSellerAuthenticated} = require("../middleware/auth") 
const Shop = require("../model/shop")
// const { upload } = require("../multer")
const cloudinary = require("../cloudinary/cloudinaryconfig")



//sign-up shop
router.post("/create-shop", async(req, res, next) => {
    try{
      // console.log(req.body)
        const { name, email, password, phoneNumber, address, avatar, zipCode } = req.body
        console.log(email)
        const sellerEmail = await Shop.findOne({email})

        if (sellerEmail) {
          // return next(new ErrorHandler("User already exists", 400))
          return res.status(400).json({ status: false , message:"User already exists"})
        }

        let avatarData = {}

        if(avatar){
          const result = await cloudinary.uploader.upload(avatar, {
            folder: "seller_ecommerce1"
          })
          console.log(result)
          avatarData = {
            public_id: result.public_id,
            url: result.secure_url
          }
        }

  
        

      
          const seller = {
              name: name,
              email: email,
              password: password,
              avatar: avatarData,
              address: address,
              phoneNumber: phoneNumber,
              zipCode: zipCode
          }

          const activationToken = createActivationToken(seller);

          const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;

          try {
            await sendMail({
              email: seller.email,
              subject: "Activate your account",
              message: `Hello ${seller.name}, please click on the link to activate your account: ${activationUrl}`,
            });
            res.status(201).json({
              success: true,
              message: `please check your email:- ${seller.email} to activate your account!`,
            });
          } catch (error) {
            // return next(new ErrorHandler(error.message, 500))
            res.status(500).json({
              success: false,
              message: error.message
            })
          } 
  
    }catch(error){
        // return next(new ErrorHandler(error.message, 400))
        res.status(400).json({
          success: false,
          message: error.message
        })
    }
})

const createActivationToken = (seller) => {
    return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
      expiresIn: "5m",
    });
  };



router.post(
    "/activation",
    catchAsyncError(async (req, res, next) => {
      try {
        const { activation_token } = req.body;
  
        const newSeller = jwt.verify(
          activation_token,
          process.env.ACTIVATION_SECRET
        );
  
        if (!newSeller) {
          // return next(new ErrorHandler("Invalid token", 400));
          return res.status(400).json({
            success: false,
            message: "Invalid token"
          });
        }
        const { name, email, password, avatar, zipCode, address, phoneNumber } = newSeller;
  
        let seller = await Shop.findOne({ email });
  
        if (seller) {
            // return next(new ErrorHandler("User already exists", 400));
            return res.status(400).json({
              success: false,
              message: "User already exists"
            });
        }

        
        console.log(
            
                name,
                email,
                avatar,
                password,
                zipCode,
                address,
                phoneNumber
            
        )

        seller = await Shop.create({
          name,
          email,
          avatar,
          password,
          zipCode,
          address,
          phoneNumber
        });
  
        sendShopToken(seller, 201, res);
      } catch (error) {
        // return next(new ErrorHandler(error.message, 500));
        res.status(500).json({
          success: false,
          message: error.message
        })
      }
    })
  );

// login shop
router.post(
  "/login-shop",
  catchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        // return next(new ErrorHandler("Please provide the all fields!", 400));
        return res.status(400).json({
          success: false,
          message: "Please provide the all fields!"
        });
      }

      const seller = await Shop.findOne({ email }).select("+password");

      if (!seller) {
        // return next(new ErrorHandler("User doesn't exists!", 400));
        return res.status(400).json({
          success: false,
          message: "User doesn't exists!"
        });
      }

      

      const isPasswordValid = await seller.comparePassword(password);

      if (!isPasswordValid) {
        // return next(new ErrorHandler("Please provide the correct information", 400));
        return res.status(400).json({
          success: false,
          message: "Please provide the correct information"
        });
      }

     await sendShopToken(seller, 201, res);
    } catch (error) {
      // return next(new ErrorHandler(error.message, 500));
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  })
);


//get-seller
router.get("/getSeller", isSellerAuthenticated, catchAsyncError(async(req,res,next) => {
  try{
    // console.log(req.seller) // ?
    const seller = await Shop.findById(req.seller.id)

    if(!seller){
      // return next(new ErrorHandler("User doesn't exist", 400))
      return res.status(400).json({
        success: false,
        message: "User doesn't exist"
      })
    }

    res.status(200).json({
      success: true,
      seller
    })

  }catch(error){
    // return next(new ErrorHandler(error.message, 500))
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}))

// log out from shop

router.get("/logout", catchAsyncError(async(req,res,next) => {
  try{
    res.cookie("seller_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true
    })

    res.status(201).json({
      success: true,
      message: "Log out successful!"
    })

  }catch(error){
    // return next(new ErrorHandler(error.message, 500))
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}))

router.get("/get-shop-info/:id", catchAsyncError(async(req,res,next) => {
  try{
    const shop = await Shop.findById(req.params.id)
    res.status(201).json({
      success: true,
      shop
    })
  }catch(error){
    // return next(new ErrorHandler(error.message, 500))
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}))

// update shop profile picture
router.put("/update-shop-avatar", isSellerAuthenticated, catchAsyncError(async(req,res,next) => {
  try{
    let existsSeller = await Shop.findById(req.seller._id)

    const imageId = existsSeller.avatar.public_id

    await cloudinary.uploader.destroy(imageId)

    const myCloud = await cloudinary.uploader.upload(req.body.avatar,{
      folder:"seller_ecommerce1",
      width:150
    })

    existsSeller.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url
    }

    await existsSeller.save()

    res.status(200).json({
      success: true,
      seller: existsSeller
    })

  }catch(error){
    // return next(new ErrorHandler(error.message, 500))
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}))

// update seller info
router.put("/update-seller-info", isSellerAuthenticated, catchAsyncError(async(req,res,next) => {
  try{
    
    const {name, description, address, phoneNumber, zipCode} = req.body

    const shop = await Shop.findOne(req.seller._id)

    if(!shop){
      return next(new ErrorHandler("User not found", 400))
    }

    shop.name = name;
    shop.description = description
    shop.address = address
    shop.phoneNumber = phoneNumber
    shop.zipCode = zipCode

    await shop.save()

    res.status(201).json({
      success: true,
      shop
    })
  }catch(error){
    // return next(new ErrorHandler(error.message))
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}))



module.exports = router