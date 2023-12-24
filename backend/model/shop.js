const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const shopSchema = new mongoose.Schema({
    name:{
        type: String,
        // required: [true, "Please enter your shop name!"],
    },
    email:{
        type: String,
        // required: [true, "Please enter your shop email address"],
    },
    password:{
        type: String,
        required: [true, "Please enter your password"],
        minLength:[4, "Password should be grater than 4 character"],
        select: false,
    },
    phoneNumber:{
        type:Number,
        required: true
    },
    description:{
        type: String,
    },
    address:[
        // {
        //     country:{
        //         type:String,
        //     },
        //     city:{
        //         type:String
        //     },
        //     address1:{
        //         type:String
        //     },
        //     address2:{
        //         type:String
        //     },
        //     zipcode:{
        //         type:String
        //     },
        //     addressType:{
        //         type:String
        //     },
        // }
        {
            type: String,
            // required: true
        }
    ],
    role:{
        type: String,
        default: "seller"
    },
    avatar:{
        // type: String,
        // required: true
        public_id:{
            type: String,
            // required: true,
        },
        url:{
            type: String,
            // required: true
        }
    },
    zipCode:{
        type: Number,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    resetPasswordToken: String,
    resetPasswordTime: Date  
})


shopSchema.pre("save", async function (next){
    if(!this.isModified("password")){
      next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
  });
  


// jwt token
shopSchema.methods.getJwtToken =  function () {
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET_KEY,{
      expiresIn: process.env.JWT_EXPIRES,
    });
  };

  
  // compare password
  shopSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

module.exports = mongoose.model("Shop", shopSchema)