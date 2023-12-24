const express = require("express")
const router = express.Router()
const catchAsyncError = require("../middleware/catchAsyncError")
const Product = require("../model/product")
const Shop = require("../model/shop")
const ErrorHandler = require("../utils/ErrorHandler")
const {isSellerAuthenticated} = require("../middleware/auth")
const fs = require("fs")
const cloudinary = require("../cloudinary/cloudinaryconfig")
const fileUpload = require("express-fileupload")

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
      return next(new ErrorHandler("Shop Id is Invalid", 400))
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
    return res.status(400).json({ message: 'No images uploaded' });
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
    return next(new ErrorHandler(error, 400))
  }
}))

router.delete('/delete-shop-product/:id', catchAsyncError(async(req,res,next) => {
  try{
    const product = await Product.findById(req.params.id)
    if(!product){
      return next(new ErrorHandler("Product is not found with this id", 404))
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
      return next(new ErrorHandler(error, 400));
    }
  })
);



module.exports = router;
