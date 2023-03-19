const mongoose = require('mongoose')
const Logger = require("../../utils/logger/userLogger");

const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        first_name: String,
        last_name: String,
        email: {
            type:String,
            unique: true
        },
        password:String,
        email_verified:Date
    },
    {
        timeStamp: true,
        versionKey: false
    }
)


UserSchema.post('save',(doc) => {
    Logger.log({
        level: 'info',
        message: doc
    })
})

module.exports = mongoose.model('User', UserSchema, 'users')