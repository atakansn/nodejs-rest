const mongoose = require('mongoose')
const Logger = require('../../utils/logger/categoryLogger')

const Schema = mongoose.Schema

const CategorySchema = new Schema(
    {
        name: String,
        slug: String
    },
    {
        timeStamp:true,
        versionKey:false
    }
)


CategorySchema.post('save',(doc) => {
    Logger.log({
        level: 'info',
        message: doc
    })
})

module.exports = mongoose.model('Category',CategorySchema,'categories')