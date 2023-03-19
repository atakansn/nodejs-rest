const mongoose = require('mongoose')
const appLogger = require("../utils/logger/appLogger");

mongoose.set('strictQuery',false)

const db = mongoose.connection

db.once('open',() => {
    appLogger.log({
        level: 'info',
        message: `MongoDB Connected HOST:[${process.env.DB_HOST}] PORT:[${process.env.DB_PORT}]`
    })
})

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }catch (e){
        appLogger.log({
            level: 'error',
            message: e.message
        })
    }
}

module.exports = {
    connectDB
}