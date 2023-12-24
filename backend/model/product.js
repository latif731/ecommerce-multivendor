const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        // required: [true, "Please enter your product name!"]
    },
    description:{
        type: String,
        // required: [true, "Please enter your product descriptions!"]
    },
    category:{
        type: String,
        // required: [true, "Please enter your product category!"]
    },
    tags:{
        type: String,
        // required:[true, "Please enter your product tags!"]
    },
    originalPrice:{
        type: Number,
    },
    discountPrice:{
        type: Number,
        // required: [true, "Please enter your product price!"]
    },
    stock:{
        type: Number,
        // required:[true, "Please enter your product stock!"],
    },
    imageUrl:[{
        secure_url: String,
        public_id:String
    }],
    shopId:{
        type: String,
        // required: true
    },
    shop:{
        type: Object,
        // required: true
    },
    sold_out: {
        type: Number,
        default: 0,
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Product", productSchema);