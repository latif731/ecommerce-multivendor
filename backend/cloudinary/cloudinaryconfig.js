const cloudinary = require('cloudinary').v2
 
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path:"config/.env"
    })
}

cloudinary.config({ 
    cloud_name: 'tempegoreng' ,
    api_key: '699556367775722',
    api_secret: 'M97Jdj9WTj4VIBA5cQ5kusMBxnQ'
});

module.exports = cloudinary