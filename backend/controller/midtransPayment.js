const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler")
const coreApi = require("../midtrans/midtransConfig")
const Order = require("../model/order")
const Payment = require("../model/midtransPayment")
const User = require("../model/midtransPayment")
const  { isAuthenticated, isAdmin }  = require("../middleware/auth")



router.post("/payment-credit-card",async (req, res, next) => {
    try{

        // Dapatkan data pembayaran dari request
        const paymentData = req.body

        // simpan data pembayaran ke dalam model payment
        const payment = new Payment(paymentData);
        await payment.save();


        // Lakukan logika pembayaran sesuai dengan kebutuhan aplikasi Anda
        // Misalnya, dapatkan token kartu kredit dari Midtrans
        const cardTokenResponse = await coreApi.cardToken({
            card_number: paymentData.credit_card.card_number,
            expire_month: paymentData.credit_card.expire_month,
            expire_year: paymentData.credit_card.expire_year,
            cvv: paymentData.credit_card.cvv
        });
        
        const cardToken = cardTokenResponse.token_id;


        // lakukan charge menggunakan token kartu kredit
        const chargeParameter = {
            payment_type: "credit_card",
            transaction_details: {
                order_id: paymentData.transaction_details.order_id,
                gross_amount: paymentData.transaction_details.gross_amount,
            },
            credit_card: {
                token_id: cardToken,
            },
        }

        const chargeResponse = await coreApi.charge(chargeParameter);
        console.log(`chargeResponse:`, JSON.stringify(chargeResponse));

        
        // Simpan respons pembayaran ke dalam model Payment
        payment.payment_response = chargeResponse;
        await payment.save();

        res.status(200).json({ success: true, message: "Payment successful" });

    }catch(error){
        return next(new ErrorHandler(error, 400))
    }
})


router.post("/payment-transfer", async (req, res, next) => {
    try {

        const paymentData = req.body
        console.log("payment data", paymentData)

        const payment = new Payment(paymentData)
        await payment.save()

        const chargeParameter = {
            "payment_type": "bank_transfer",
            "transaction_details": {
                "order_id": "ORDER-123458",
                "gross_amount": 100000
              },
            "customer_details": {
                "first_name": "John",
                "last_name": "Doe",
                "email": "john.doe@example.com",
                "phone": "1234567890"
              },
              "bank_Transfer": {
                "bank": "Bank ABC"
              },
              "credit_card": {
                "token_id": "token123",
                "cvv": "123",
                "expire_year": "2023",
                "expire_month": "01",
                "card_number": "1234567890123456"
              },
              "cstore": {
                "store": "Alfamart"
              },
        }

        const chargeResponse = await coreApi.charge(chargeParameter);
        console.log(`chargeResponse:`, JSON.stringify(chargeResponse));
        payment.payment_response = chargeResponse;
        await payment.save();   
        res.status(200).json({ success: true, message: "Payment successful" });
    } catch (error) {
        console.log('Error occurred:', error.message);
        return next(new ErrorHandler(error, 400));
    }
});

router.post("/payment-conter", 
// isAuthenticated,
async (req, res, next) => {
    try {

        const paymentData = req.body
        const payment = new Payment(paymentData)
        await payment.save()
        
        const user = await User.findById(req.user._id)
        console.log("user",user)
        const order = await Order.findById(req.order._id)
        console.log("order",order)
        // const chargeParameter = {
        //     payment_type: "cstore",
        //     transaction_details: {
        //         order_id: paymentData.transaction_details.order_id,
        //         gross_amount: paymentData.transaction_details.gross_amount,
        //     },
        //     cstore: {
        //         store: paymentData.csStore.store,
        //     },
        //     customer_details:{
        //         first_name: paymentData.customer_details.first_name, 
        //         last_name: paymentData.customer_details.last_name,
        //         email: paymentData.customer_details.email,
        //         phone: paymentData.customer_details.phone
        //     },

        // }

        console.log("chargeParameter", chargeParameter)

        const test =   {
        "payment_type": "cstore",
                "transaction_details": {
                    "gross_amount": 10000,
                    "order_id": "order30"
                },
                "cstore": {
                    "store": "Alfamart",
                    "message": "Tiket1 transaction"
                },
                  "enabled_payments": ["alfamart", "indomaret"]
                  
        }

        // const chargeResponse = await coreApi.charge(chargeParameter);
        const chargeResponse = await coreApi.charge(test);
        console.log(`chargeResponse:`, JSON.stringify(chargeResponse));
        payment.payment_response = chargeResponse;
        // await payment.save();
        res.status(200).json({ success: true, message: "Payment successful" });
    } catch (error) {
        console.log('Error occurred:', error.message);
        return next(new ErrorHandler(error, 400));
    }
});




module.exports = router



