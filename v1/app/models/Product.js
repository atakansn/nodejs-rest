const mongoose = require('mongoose')
const Logger = require("../../utils/logger/productLogger");

const Schema = mongoose.Schema

const ProductSchema = new Schema(
    {
        category_id: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        },
        name: String,
        sku: String,
        slug: String,
        price: Number,
        quantity: Number,
        image: String,
        description: String

    },
    {
        timeStamp: true,
        versionKey: false
    }
)


ProductSchema.post('save',(doc) => {
    Logger.log({
        level: 'info',
        message: doc
    })
})

module.exports = mongoose.model('Product', ProductSchema, 'products')