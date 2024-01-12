const Conversation = require("../model/conversation")
const ErrorHandler = require("../utils/ErrorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const express = require("express")
const router = express.Router()
const {isSellerAuthenticated, isAuthenticated} = require("../middleware/auth")

// create a new conversation
router.post("/create-new-conversation", isSellerAuthenticated, isAuthenticated, catchAsyncError(async(req,res,next) => {
    try{
        const {groupTitle, userId, sellerId} = req.body;

        console.log(req.body)

        const isConversationExist = await Conversation.findOne({groupTitle})
        if (isConversationExist) {
            const conversation = isConversationExist;
            res.status(201).json({
              success: true,
              conversation,
            });
          } else {
            const conversation = await Conversation.create({
              members: [userId, sellerId],
              groupTitle: groupTitle,
            });
    
            res.status(201).json({
              success: true,
              conversation,
            });
          }

    }catch(error){
        // return next(new ErrorHandler(error.response.message), 500)
       return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}))


// get user conversation 
router.get("/get-all-conversation-seller/:id",
isSellerAuthenticated, 
isAuthenticated,
catchAsyncError(async(req,res,next) => {
    try{
        const conversations = await Conversation.find({members:{
            $in: [req.params.id]
        }}).sort({updatedAt: -1, createdAt: -1})

        res.status(201).json({
            success:true,
            conversations
        })

    }catch(error){
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}) )

// update last message
router.put("/update-last-message/:id", catchAsyncError(async(req,res,next) => {
    try{
        
        const {lastMessage, lastMessageId} = req.body

        const conversation = await Conversation.findByIdAndUpdate(req.params.id,{
            lastMessage,
            lastMessageId
        })

        res.status(201).json({
            success: true,
            conversation
        })

    }catch(error){
        return next(new ErrorResponse('Server Error',400))
    }
}))

router.get("/get-all-conversation-user/:id", 
isAuthenticated,
catchAsyncError(async(req,res,next) => {
    try{
        const conversations = await Conversation.find({
            members:{
                $in: [req.params.id]
            }
        }).sort({ updatedAt: -1, createdAt: -1 });

        res.status(201).json({
            success:true,
            conversations,
        })


    }catch(error){
        return res.status(500).json({
            success : false,
            error : error.message
        })
    }
}))


module.exports = router