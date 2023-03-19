const mongoose = require('mongoose')
const Logger = require("../../utils/logger/userAddressLogger");

const Schema = mongoose.Schema

const UserAddressSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        phone_number:Number,
        country: String,
        city: String,
        street1: String,
        street2: String,
        state: String,
        zip: Number
    },
    {
        timeStamp: true,
        versionKey: false
    }
)

UserAddressSchema.post('save',(doc) => {
    Logger.log({
        level: 'info',
        message: doc
    })
})


module.exports = mongoose.model('UserAddress', UserAddressSchema, 'user_addresses')