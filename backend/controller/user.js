const express = require("express")
const User = require("../model/user")
// const path = require("path")
const path = require("path")
const catchAsyncError = require("../middleware/catchAsyncError")
const router = express.Router()
const fs = require("fs")
const   ErrorHandler   = require("../utils/ErrorHandler"); 
const { JsonWebTokenError } = require("jsonwebtoken")
const jwt = require("jsonwebtoken")
const sendMail = require("../utils/sendMail")
// const sendToken = require("../utils/jwtToken") 
const sendToken = require("../utils/jwtToken")
const { response } = require("../app")
const  { isAuthenticated, isAdmin }  = require("../middleware/auth")
const cloudinary = require("../cloudinary/cloudinaryconfig")
const fileUpload = require("express-fileupload")




router.use(fileUpload())
// register
router.post("/create-user", async (req, res, next) => {
    try {
      const { name, email, password, avatar } = req.body;
      const userEmail = await User.findOne({ email });
      console.log(avatar)
  
      if (userEmail) {
        // return next(new ErrorHandler("User already exists", 400));
        res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }

      let avatarData = {}
      
      if(avatar){
        const result = await cloudinary.uploader.upload(avatar, {
          folder: "user_ecommerce1"
        })
        console.log(result)
        avatarData = {
          public_id: result.public_id,
          url: result.secure_url
        }
      }
        const user = {
            name: name,
            email: email,
            password: password,
            avatar: avatarData
        }

        console.log(user)

      
  
      const activationToken = createActivationToken(user);
      // console.log(typeof activationToken)
      // console.log(activationToken)
  
      const activationUrl = `http://localhost:3000/activation/${activationToken}`;
  
      try {
        await sendMail({
          email: user.email,
          subject: "Activate your account",
          message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
        });
        res.status(201).json({
          success: true,
          message: `please check your email:- ${user.email} to activate your account!`,
        });
      } catch (error) {
        // return next(new ErrorHandler(error.message, 500));
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    } catch (error) {
      // return next(new ErrorHandler(error.message, 400));
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  });

  const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
      expiresIn: "5m",
    });
  };



router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar } = newUser;

      let user = await User.findOne({ email });

      if (user) {
        // return next(new ErrorHandler("User already exists", 400));
        res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }
      user = await User.create({
        name,
        email,
        avatar,
        password,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// refresh token
router.post("/refresh-token", async(req,res,next) => {
  try{
    
    const { refreshToken } = req.body;

    console.log("ini refresh token", req.body)

    if(!refreshToken){
      // return next(new ErrorHandler("Refresh token is required", 400));
      res.status(400).json({
        success: false,
        message: "Refresh token is required",
      })
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

    const user = await User.findById(decoded.id);

    if(!user || user.refreshToken !== refreshToken){
      return next(new ErrorHandler("Invalid refresh token", 400))
    }

    const newAccessToken = user.getJwtToken();

    console.log("new access token",newAccessToken)

    res.status(200).json({
      access: true,
      accessToken: newAccessToken,
    })
  }catch (error){
    console.error("Refresh token error", error);
    if(error.name === "TokenExpiredError"){
      // return next(new ErrorHandler("refresh token has expire", 400))
      res.status(400).json({
        success: false,
        message: "refresh token has expire",
      })
    }
    // return next(new   ErrorHandler("Invalid refreshToken", 400))
    res.status(400).json({
      success: false,
      message: "Invalid refreshToken",
    })
  }
})


// login-user
router.post(
  "/login-user",
  catchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await User.findOne({ email }).select("+password");

      // const token = user.getJwtToken();
      //  console.log('token', token)

      if (!user) {
        // return next(new ErrorHandler("User doesn't exists!", 400));
        res.status(400).json({
          success: false,
          message: "User doesn't exists!",
        });
      }

      

      const isPasswordValid = password ? await user.comparePassword(password) : false;


      if (!isPasswordValid) {
        return next(
        // new ErrorHandler("Please provide the correct information", 400)
        new ErrorHandler("Please provide the correct information", 400)
        );
      }

      const accessToken = user.getJwtToken()
      const refreshToken = await user.generateRefreshToken()



     await sendToken(user, 201, res, refreshToken);
    // res.status(201).json({
    //   success: true,
    //   accessToken,
    //   refreshToken,
    //   user
    // })
    } catch (error) {
      // return next(new ErrorHandler(error.message, 500));
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  })
);





//  load user
router.get("/get-user", isAuthenticated, catchAsyncError(async(req,res,next) => {
  try{
    const user = await User.findById(req.user.id)

    if(!user){
      return next(new ErrorHandler("User doesn't exist", 400))
    }

    res.status(200).json({
      success: true,
      user
    })

  }catch(error){
    // return next(new ErrorHandler(error.message, 500))
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}))

// log out user

router.get("/logout", catchAsyncError(async(req,res,next) => {
  try{
    res.cookie("token", null, {
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

// update user info
router.put("/update-user-info", isAuthenticated, catchAsyncError(async(req,res,next) => {
  try{
    const {name, email, phoneNumber, password } = req.body;
    // console.log("update",req.body)

    const user = await User.findOne({email}).select("+password");
    // console.log("user", user)

    // if(!user){
    //   return next(new ErrorHandler("User not found", 400))
    // }

    // const isPasswordValid = password ? await user.comparePassword(password) : true 
    // console.log("validation",isPasswordValid)

    // if(!isPasswordValid) {
    //   return next( new ErrorHandler("Please provide the correct information", 400))
    // } 

    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;
    // user.password = password;

    await user.save();

    res.status(201).json({
      success: true,
      user
    })

  }catch(error){
    // return next(new ErrorHandler(error.message, 500))
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}))

// update user avatar
// router.put("/update-avatar", isAuthenticated, catchAsyncError(async(req,res,next) => {
//   try{
//     let existsUser = await User.findById(req.user.id);
//     console.log(existsUser)
//     // const { avatar } = req.file
//     // console.log(avatar)
//     // const updateAvatar = req.body.avatar
//     // console.log("updateAvatar", updateAvatar)
//     const avatar = req.files && req.files.avatar;
//     if(!avatar){
//       return res.status(400).json({error:"No avatar file provided"})
//     }
//     if(existsUser.avatar.public_id){
//       await cloudinary.uploader.destroy(existsUser.avatar.public_id);
//     }

//     const result = await cloudinary.uploader.upload(req.files.avatar.tempFilePath);


//     existsUser.avatar = {
//       public_id: result.public_id,
//       url: result.secure_url,
//     };
//     await existsUser.save();

//     res.status(200).json({
//       success: true,
//       message: "Avatar updated successfully",
//       data: existsUser,
//     });


//     // console.log("Avatar:", avatar);
//   }catch(error){
//     return next(new ErrorHandler(error.message, 500))
//   }
// }))

router.put(
  "/update-avatar",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      let existsUser = await User.findById(req.user.id);
      if (req.body.avatar !== "") {
        const imageId = existsUser.avatar.public_id;

        await cloudinary.uploader.destroy(imageId);

        const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
          folder: "user_ecommerce1",
          width: 150,
        });

        existsUser.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      await existsUser.save();

      res.status(200).json({
        success: true,
        user: existsUser,
      });
    } catch (error) {
      // return next(new ErrorHandler(error.message, 500));
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  })
);

// update user addresses
router.put(
  "/update-user-addresses", 
  isAuthenticated,
  catchAsyncError(async (req,res,next) => {
    try{
      const user = await User.findById(req.user.id)

      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      )
      
      if(sameTypeAddress){
        // return next(new ErrorHandler(`${req.body.addressType}`))
        return res.status(400).json({error: `${req.body.addressType}`})
      }

      const existsAddress = user.addresses.find((address) => address._id === req.body._id)

      if(existsAddress){
        Object.assign(existsAddress, req.body);
      }else{
        user.addresses.push(req.body)
      }

      await user.save()
      
      res.status(200).json({
        success: true,
        user
      })

    }catch(error){
      // return next(new ErrorHandler(error.message, 500))
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  })
  ) 

  // delete user address
  router.delete(
    "/delete-user-address/:id",
    isAuthenticated,
    catchAsyncError(async(req,res,next) => {
      try{
        const userId = req.user._id;
        const addressId = req.params.id

        await User.updateOne({
          _id: userId,
        },
        { $pull: { addresses: {_id: addressId} }}
        )

        const user = await User.findById(userId)

        res.status(200).json({success: true, user})

      }catch(error){
        // return next(new ErrorHandler(error.message, 500))
        res.status(500).json({
          success: false,
          message: error.message
        })
      }
    })
  )

  // update user password
  router.put(
    "/update-user-password",
    isAuthenticated,
    catchAsyncError(async(req,res,next) => {
      try{
        const user = await User.findById(req.user.id).select("+password")
        const isPasswordMatched = await user.comparePassword(
          req.body.oldPassword
        )

        if(!isPasswordMatched) {
          // return next(new ErrorHandler("Old password is incorrect!", 400))
          return res.status(400).json({error: "Old password is incorrect!"}) 
        }

        if(req.body.newPassword !== req.body.confirmPassword) {
          // return next(
          //   new ErrorHandler("Password doesn't matched with each other!", 400)
          // )
          return res.status(400).json({error: "Password doesn't matched with each other!"})
        }

        user.password = req.body.newPassword;

        await user.save();

        res.status(200).json({
          success: true,
          message: "Password updated successfully"
        })

      }catch(error){
        // return next(new ErrorHandler(error.message, 500))
        res.status(500).json({
          success: false,
          message: error.message
        })
      }
    })
  )

  // all users --- fo admin 
  router.get(
    "/admin-all-users",
    isAuthenticated, 
    isAdmin("Admin"),
    catchAsyncError(async(req,res,next) => {
      try{
        const users = await User.find().sort({
          createdAt: -1,
        })
        res.status(201).json({
          success: true,
          users,
        })
      }catch(error){
        // return next(new ErrorHandler(error.message, 500))
        res.status(500).json({
          success: false,
          message: error.message
        })
      }
    })
  )

  // delete users --- admin
  router.delete(
    "/delete-user/:id",
    isAuthenticated,
    isAdmin("Admin"),
    catchAsyncError(async(req,res,next) => {
      try{
        const user = await User.findById(req.params.id)

        if(!user){
          // return next(new ErrorHandler("User is not available with this id", 400))
          return res.status(400).json({error: "User is not available with this id"})
        }

        const imageId = user.avatar.public_id;

        await cloudinary.uploader.destroy(imageId);

        await User.findByIdAndDelete(imageId)

        res.status(201).json({
          success: true,
          message: "User deleted successfully"
        })        

      }catch(error){
        // return next(new ErrorHandler(error.message, 500))
        res.status(500).json({
          success: false,
          message: error.message
        })
      }
    })
    )


module.exports = router