const mongoose = require('mongoose')
const Logger = require("../../utils/logger/passwordResetTokenLogger");

const Schema = mongoose.Schema

const PasswordResetTokenSchema = new Schema(
    {
        email: String,
        token: String,
        created_at: Date
    },
    {
        versionKey: false
    }
)

PasswordResetTokenSchema.post('save',(doc) => {
    Logger.log({
        level: 'info',
        message: doc
    })
})

module.exports = mongoose.model('PasswordResetToken',PasswordResetTokenSchema,'password_reset_tokens')