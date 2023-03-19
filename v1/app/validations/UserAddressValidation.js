const Joi = require('joi')

const createValidation = Joi.object(({
    user_id: Joi.string().required().min(3),
    country: Joi.string().required(),
    city: Joi.string().required(),
    street1: Joi.string().required(),
    street2: Joi.string(),
    zip: Joi.number().required()

}))

const updateValidation = Joi.object(({
    user_id: Joi.string().min(3),
    country: Joi.string(),
    city: Joi.string(),
    street1: Joi.string(),
    street2: Joi.string(),
    zip: Joi.number()

}))


module.exports = {createValidation, updateValidation}