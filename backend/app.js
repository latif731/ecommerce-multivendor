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
app.use(express.urlencoded({extended: true}))
app.use(express.json())


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
// const withdraw = require("./controller/withdraw")

app.use("/api/v2/user", user)
app.use("/api/v2/shop", shop)
app.use("/api/v2/product", product)
app.use("/api/v2/event", event)
app.use("/api/v2/coupon", coupon)
// app.use("/api/v2/withdraw", withdraw)



// it's for ErrorHandling
app.use(ErrorHandler)
// Error handling middleware
// Updated Error handling middleware in app.js
app.use((err, req, res, next) => {
    if (err instanceof ErrorHandler) {
        res.status(err.statusCode).json({ success: false, message: err.message });
    } else {
        res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
    }
});

// Updated Error handling middleware in app.js
// app.use((err, req, res, next) => {
//   if (err instanceof ErrorHandler) {
//       res.status(err.statusCode).json({ success: false, message: err.message });
//   } else {
//       res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
//   }
// });



module.exports = app;