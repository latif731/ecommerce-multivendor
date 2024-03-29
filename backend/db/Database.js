const mongoose = require("mongoose")
// const app = require("../app")

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((data) => {
        console.log(`mongod connected with server: ${data.connection.host}`)
    })
}

module.exports = connectDatabase