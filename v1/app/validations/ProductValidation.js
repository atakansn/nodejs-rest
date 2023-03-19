const Joi = require('joi')

const createValidation = Joi.object(({
    category_id: Joi.string().required().max(24),
    name: Joi.string().required().min(4),
    slug: Joi.string().min(5),
    price: Joi.number().required(),
    quantity: Joi.number().required().min(1).max(200),
    description: Joi.string().required().min(15),
    image: Joi.string(),
    sku: Joi.string().min(5).max(18),
}))

const updateValidation = Joi.object(({
    category_id: Joi.string().max(24),
    name: Joi.string().min(4),
    slug: Joi.string().min(5),
    price: Joi.number(),
    quantity: Joi.number().min(1).max(200),
    description: Joi.string().min(15).max(35),
    image: Joi.string(),
    sku: Joi.string().min(5).max(18),
}))

module.exports = {createValidation, updateValidation}