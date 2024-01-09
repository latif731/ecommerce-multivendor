const express = require("express")
const router = express.Router()
const catchAsyncError = require("../middleware/catchAsyncError")
const ErrorHandler = require("../utils/ErrorHandler")
const Shop = require("../model/shop")
const Event = require("../model/event")
const fs = require("fs")
const {isSellerAuthenticated, isAuthenticated, isAdmin} = require("../middleware/auth")
const cloudinary = require("../cloudinary/cloudinaryconfig")
const fileUpload = require("express-fileupload")
const Product = require("../model/product")


router.use(fileUpload())

router.post('/create-event', async (req, res, next) => {
            try {
      // ... (other code)
          const {
            name, 
            description, 
            category, 
            tags,
            originalPrice,
            discountPrice,
            productEvent,
            stock,
            shop,
            shopId,
            start_date,
            finish_date,
            productId,
            imageUrl2
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

      const productData = await Product.findById(productId);
      if(!productData){
        // return next(new ErrorHandler("Product Id is invalid", 400))
        return res.status(400).json({
          success: false,
          error: "Product Id is invalid"
        })
      }


      const images = req.files ? Object.entries(req.files) : [];
      // const images = []
      // for (const key in req.files) {
      //   if (req.files.hasOwnProperty(key)) {
      //     images.push(req.files[key]);
      //   }
      // }
      
      // const images = req.files.image
      console.log(images) 
      


      
      // if (!images || images.length === 0) {
      // return res.status(400).json({ message: 'No images uploaded' });
      // } 
      // else {
      //   const images = Object.values(req.files)
      //   console.log(images)
      // }


  
      const event = new Event({
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId,
        productId,
        productEvent : productData,
        shop : shopData,
        imageUrl:[],
        start_date,
        imageUrl2,
        finish_date
      })
  
      console.log(event)

      if(event.start_date < new Date() && event.finish_date > new Date()) {
        await Product.findByIdAndUpdate(
          productData._id,
          {
            $set:{
              originalPrice: event.originalPrice,
              discountPrice: event.discountPrice,
            }
          },
          {
            new:true
          }
        )
      }


      if (event.imageUrl2 && event.imageUrl2.length > 0) {
        event.imageUrl = [];
      }else{
      const imageUrls = await Promise.all(
        // console.log("image url", imageUrls)
        images.map(async ([key, image]) => {
          try {
            // Use the mv() method to move the file to the temporary location
            const tempPath = `./temp/${image.name}`;
            await image.mv(tempPath);
  
            const result = await cloudinary.uploader.upload(tempPath, {
              folder: "event_ecommerce1",
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
          event.imageUrl = imageUrls;
          event.imageUrl2 = JSON.parse(req.body.imageUrl2 || '[]');
          // res.status(200).json({ message: 'Product created successfully' });
        }else {
          // return res.status(500).json({ message: 'Failed to upload one or more images' });
          res.status(400).json({ message: 'Failed to upload one or more images' });
        }
      
      }
        
        await event.save();
        res.status(200).json({ message: 'Product created successfully' });
      // ... (other code)
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

// get all events
router.get("/get-all-events", async(req,res,next) => {
  try{
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events
    })
  }catch(error){
    // return next(new ErrorHandler(error, 400))
    res.status(400).json({
      success: false,
      error: error
    })
  }
})

// get all Event of a shop
router.get("/get-all-event/:id", catchAsyncError(async(req, res, next) => {
    try{
        const events = await Event.find({shopId: req.params.id})

        res.status(201).json({
            success: true,
            events
        })
    }catch(error){
        // return next(new ErrorHandler(error, 400))
        res.status(400).json({
            success: false,
            error: error
        })
    }
}))

// delete events of a shop
router.delete("/delete-shop-event/:id",
catchAsyncError(async(req,res,next) => {
    try{
        const EventId = req.params.id

        const eventData = await Event.findById(EventId)
        
        console.log("Image URLs to delete", eventData.imageUrl)

        for(let i = 0; i < eventData.imageUrl.length; i++){
          try{
          const result = await cloudinary.uploader.destroy(
            eventData.imageUrl[i].public_id
            )
            console.log(result)
          }catch (error){
            console.error(`Error deleting image from Cloudinary: ${error.message}`);
          }
       }

        const event = await Event.findByIdAndDelete(EventId)

        if(!event){
            // return next (new ErrorHandler(`Event not found with this id!`, 500))
            res.status(400).json({
                success: false,
                error: "Event not found with this id!"
            })
        }

        res.status(201).json({
            success: true,
            event
        })

    }catch (error) {
        // return next(new ErrorHandler(error, 400))
        res.status(400).json({
            success: false,
            error: error
        })
    }
}))

// all events --- for admin
router.get(
  "/admin-all-events", 
  isAuthenticated, 
  isAdmin("Admin"),
  catchAsyncError(async(req,res,next) => {
    try{
      const events = await Event.find().sort({
        createdAt: -1,
      })
      res.status(201).json({
        success: true,
        events
      })
    }catch(error){
      // return next(new ErrorHandler(error.message, 500))
      res.status(500).json({
        success: false,
        error: error.message
      })
    }
  })
  )


module.exports = router