const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter your event product name!"]
    },
    description:{
        type: String,
        required: [true, "Please enter your event product descriptions!"]
    },
    category:{
        type: String,
        required: [true, "Please enter your event product category!"]
    },
    productId:{
        type: String,
        required: true
    },
    productEvent:{
        type: Object,
    },
    start_date:{
        type: Date,
        required: true
    },
    finish_date:{
        type: Date,
        required: true
    },
    status:{
        type: String,
        default:"Running" 
    },
    tags:{
        type: String,
    },
    originalPrice:{
        type: Number,
    },
    discountPrice:{
        type: Number,
        required: [true, "Please enter your event product price!"]
    },
    // stock:{
    //     type: Number,
    //     required:[true, "Please enter your event product stock!"],
    // },
    imageUrl:[{
        secure_url: String,
        public_id:String
    }],
    imageUrl2:[{
        secure_url: String,
        public_id:String
    }],
    shopId:{
        type: String,
        required: true
    },
    shop:{
        type: Object,
        required: true
    },
    // sold_out: {
    //     type: Number,
    //     default: 0,
    // },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Event", eventSchema);