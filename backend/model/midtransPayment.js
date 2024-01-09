const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
    payment_type: {
        type: String,
        required: true
    },
    transaction_details: [{
        gross_amount:{
            type: Number,
            required: true
        },
        order_id:{
            type: String,
            required: true
        }
    }],
    cstore:{
        store:{
            type: String,
            required: true
        }
    },
    credit_card: {
        card_number: {
            type: String,
            required: true
        },
        expire_month: {
            type: Number,
            required: true
        },
        expire_year: {
            type: Number,
            required: true
        },
        cvv: {
            type: Number,
            required: true
        },
        token_id:{
            type: String,
            required: true
        }
    },
    bank_Transfer:{
        bank:{
            type: String,
            required: true
        }
    },
    gopay:{
        enable_callback : {
            type: String,
        },
        "callback_url" : {
            type: String,
        }
    },
    shopeepay:{
        callback_url: {
            type: String
        }
    },
    customer_details:{
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    item_detail : {
        type: Object
    },
    payment_response:{
        type: Object
    },
    enabled_payments:[{
        indomaret:{
            type: String,
            // required: true,
            default:"indomaret"
        },
        alfamart:{
            type: String,
            default:"alfamart"
            // required: true
        },
        echannel:{
            type: Boolean,
            required: true
        },
        bca_klikbca:{
            type: Boolean,
            required: true
        }
    
}]
})

module.exports = mongoose.model("Payment", paymentSchema);