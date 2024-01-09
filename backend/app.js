const express = require("express");
const ErrorHandler = require("./utils/ErrorHandler");
const app = express()
const cookieParser = require("cookie-parser")
const cors = require("cors")


app.use(cookieParser())
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
// app.use("/", express.static("uploads"))
app.use(express.urlencoded({limit: "10mb",extended: true}))
app.use(express.json({limit: "10mb"}))



// config 
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path:"config/.env"
    })
}
app.get('/',(req,res) => {
    res.send('hello, express')
})

// import routes
const user = require("./controller/user")
const shop = require("./controller/shop")
const product = require("./controller/product")
const event = require("./controller/event")
const coupon = require("./controller/couponCode")
const order = require("./controller/order")
const payment = require("./controller/payment")
const midtrans = require("./controller/midtransPayment")
const conversation = require("./controller/conversation")
const message = require("./controller/message")
// const withdraw = require("./controller/withdraw")

app.use("/api/v2/user", user)
app.use("/api/v2/shop", shop)
app.use("/api/v2/product", product)
app.use("/api/v2/event", event)
app.use("/api/v2/coupon", coupon)
app.use("/api/v2/order", order);
app.use("/api/v2/payment", payment);
app.use("/api/v2/midtrans", midtrans)
app.use("/api/v2/conversation", conversation)
app.use("/api/v2/message", message)


// app.use("/api/v2/withdraw", withdraw)



// it's for ErrorHandling
// app.use(ErrorHandler)
// Error handling middleware
// Updated Error handling middleware in app.js
app.use((err, req, res, next) => {
    if (err) {
        res.status(err.statusCode).json({ success: false, message: err.message });
    } else {
        res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
    }

    next(err);
});

// app.use((err, req, res, next) => {
//     res.locals.error = err;
//     const status = err.status || 500;
//     res.status(status);
//     res.render('error');
//   });

// Updated Error handling middleware in app.js
// app.use((err, req, res, next) => {
//   if (err instanceof ErrorHandler) {
//       res.status(err.statusCode).json({ success: false, message: err.message });
//   } else {
//       res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
//   }
// });



module.exports = app;