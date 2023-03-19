const Joi = require('joi')

const createValidation = Joi.object(({
    first_name: Joi.string().required().min(3),
    last_name: Joi.string().required().min(3),
    email: Joi.string().email().required().min(8).pattern(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/),
    password: Joi.string().required().min(8),
}))

const updateValidation = Joi.object(({
    first_name: Joi.string().min(3),
    last_name: Joi.string().min(3),
    email: Joi.string().min(8),
}))

const loginValidation = Joi.object(({
    email: Joi.string().required().min(8),
    password: Joi.string().required().min(8),
}))

const resetPasswordLinkValidation = Joi.object(({
    email: Joi.string().required().min(8).pattern(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/)
}))

const confirmPasswordValidation = Joi.object(({
    password: Joi.string().required().min(8)
}))

const changePasswordValidation = Joi.object(({
    password: Joi.string().required().min(8)
}))

module.exports = {
    createValidation,
    updateValidation,
    loginValidation,
    resetPasswordLinkValidation,
    confirmPasswordValidation,
    changePasswordValidation
}