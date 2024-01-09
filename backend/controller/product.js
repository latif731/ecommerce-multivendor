const express = require("express")
const router = express.Router()
const catchAsyncError = require("../middleware/catchAsyncError")
const Product = require("../model/product")
const Shop = require("../model/shop")
const ErrorHandler = require("../utils/ErrorHandler")
const {isSellerAuthenticated, isAuthenticated, isAdmin} = require("../middleware/auth")
const fs = require("fs")
const cloudinary = require("../cloudinary/cloudinaryconfig")
const fileUpload = require("express-fileupload")
const Order = require("../model/order")

router.use(fileUpload())


router.post('/create-product', async (req, res, next) => {
  try {
    // ... (other code)
        const {
          name, 
          description, 
          category, 
          tags,
          originalPrice,
          discountPrice,
          stock,
          shop,
          shopId,
        } =  req.body
        console.log(req.body)
    // memeastikan 'image' adalah sebuah array, sebanyak data yang dapat di upload
    const shopData = await Shop.findById(shopId)
    if(!shopData){
      // return next(new ErrorHandler("Shop Id is Invalid", 400))
      return res.status(400).json({
        success: false,
        error: "Shop Id is Invalid"
      })
    }
    const images = Object.values(req.files)
    // const images = []
    // for (const key in req.files) {
    //   if (req.files.hasOwnProperty(key)) {
    //     images.push(req.files[key]);
    //   }
    // }
    
    // const images = req.files.image
    console.log(images) 

    if (!images || images.length === 0) {
    // return res.status(400).json({ message: 'No images uploaded' });
    return res.status(400).json({
      success: false,
      error: "No images uploaded"
    })
    }

    const product = new Product({
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
      shopId,
      shop : shopData,
      imageUrl:[]
    })

    console.log(product)

    const imageUrls = await Promise.all(
      images.map(async (image) => {
        try {
          // Use the mv() method to move the file to the temporary location
          const tempPath = `./temp/${image.name}`;
          await image.mv(tempPath);

          const result = await cloudinary.uploader.upload(tempPath, {
            folder: "product",
          });

          const publicId = result.public_id
          // Remove the temporary file after successful upload
          if (fs.existsSync(tempPath)) {
            fs.unlinkSync(tempPath);
            console.log(`Temporary file ${tempPath} deleted.`);
          } else {
            console.log(`Temporary file ${tempPath} not found.`);
          }

          console.log("cloudinary", result);
          return {secure_url: result.secure_url, public_id: publicId}
          // product.imageUrl.push(result.secure_url)
        } catch (uploadError) {
          console.error("Cloudinary Upload Error", uploadError);
          throw uploadError;
        }
      })
      );
      // menyimpan array gambar URLs ke dalam product dokumen
      if (imageUrls.every((url) => url !== null)) {
        product.imageUrl = imageUrls;
        await product.save();
        res.status(200).json({ message: 'Product created successfully' });
      } else {
        res.status(500).json({ message: 'Failed to upload one or more images' });
      }
    // ... (other code)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get('/get-all-products-shop/:id', catchAsyncError(async(req,res,next)=> {
  try{
    const products = await Product.find({shopId: req.params.id})

    res.status(201).json({
      success: true,
      products
    })
  }catch (error){
    // return next(new ErrorHandler(error, 400))
    return res.status(400).json({
      success: false,
      error: error.message
    })
  }
}))

router.delete('/delete-shop-product/:id', catchAsyncError(async(req,res,next) => {
  try{
    const product = await Product.findById(req.params.id)
    if(!product){
      // return next(new ErrorHandler("Product is not found with this id", 404))
      return res.status(404).json({
        success: false,
        error: "Product is not found with this id"
      })
    }
    for(let i = 0; i < product.imageUrl.length; i++){
      try{
      const result = await cloudinary.uploader.destroy(
        product.imageUrl[i].public_id
        )
        console.log(result)
      }catch (error){
        console.error(`Error deleting image from Cloudinary: ${error.message}`);
      }
   }

    await product.deleteOne()

    res.status(201).json({
      success: true,
      message:"Product Deleted Successfully!"
    })
  }catch(error){
   return next(new ErrorHandler(error, 400))
  }
}))

router.get(
  "/get-all-products",
  catchAsyncError(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      // return next(new ErrorHandler(error, 400));
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  })
);


// review a product
router.put(
  "/create-new-review", 
isAuthenticated,
catchAsyncError(async(req,res,next) => {
  try{
    const { user, rating, comment, productId, orderId} = req.body

    const product = await Product.findById(productId)

    const review = {
      user,
      rating,
      comment,
      productId
    }

    const isReviewed = product.reviews.find((rev) => rev.user._id === req.user._id)

    if(isReviewed) {
      product.reviews.forEach((rev) => {
        if(rev.user._id === req.user._id) {
          (rev.rating = rating), (rev.comment = comment), (rev.user = user);
        }
      })
    }else {
      product.reviews.push(review)
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    })

    product.ratings = avg / product.reviews.length

    await product.save({validateBeforeSave: false})

    await Order.findByIdAndUpdate(
      orderId,
      {$set:{"cart.$[elem].isReviewed" : true}},
      {arrayFilters:[{"elem._id": productId}], new: true}
    );

    res.status(200).json({
      success: true,
      message: "Reviewed Successfully"
    })

  }catch(error){
    // return next( new ErrorHandler(error, 400))
    return res.status(400).json({
      success: false,
      error: error.message
    })
  }
}))

// all products --- for admin
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async(req,res,next) => {
    try{
      const products = await Product.find().sort({
        cretedAt: -1,
      })
      res.status(200).json({
        success: true,
        products
      })
    }catch(error){
      // return next(new ErrorHandler(error.message, 400))
      return res.status(400).json({
        success: false,
        error: error.message
      })
    }
  })
)


module.exports = router;
