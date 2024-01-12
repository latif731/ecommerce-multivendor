const Messages = require("../model/message")
const express = require("express")
const catchAsyncError = require("../middleware/catchAsyncError")
const router = express.Router()
const {isAuthenticated, isSellerAuthenticated, isAdmin} = require("../middleware/auth")
const cloudinary = require("../cloudinary/cloudinaryconfig")
// create new message

router.post("/create-new-message",
// ,isSellerAuthenticated, 
// isAuthenticated, 
catchAsyncError(async(req,res,next) => {
    try{
        messageData = req.body

        if(req.body.images){
            const myCloud = await cloudinary.uploader.upload(req.body.images, {
                folder: "message_ecommerce1"
            })
            messageData.images = {
                public_id: myCloud.public_id,
                url: myCloud.url
            }
        }

        messageData.conversationId = req.body.conversationId;
        messageData.sender = req.body.sender;
        messageData.text = req.body.text;

        const message = new Messages({
            conversationId: messageData.conversationId,
            text: messageData.text,
            sender: messageData.sender,
            images: messageData.images ? messageData.images : undefined
        })

        await message.save()

        res.status(201).json({
            success: true,
            message
        })


    }catch(error){
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}))



// get all messages with conversation
router.get("/get-all-messages/:id", catchAsyncError(async(req,res,next) => {
    try{
        const messages = await Messages.find({
            conversationId: req.params.id
        })

        res.status(201).json({
            success: true,
            messages,
        })
    }catch(error){
     return    res.status(500).json({
            success: false,
            error: error.message
        })
    }
}))

module.exports = router