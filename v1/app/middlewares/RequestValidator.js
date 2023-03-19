const httpStatus = require('http-status')
const ValidationError = require('../errors/ValidationError')

const validator = schema => (req,res,next) => {
    const {value, error} = schema.validate(req.body)

    if(error) {
        const errorMessage = error.details?.map(detail => detail.message).join(',')

        throw new ValidationError(errorMessage,httpStatus.UNPROCESSABLE_ENTITY)
    }

    Object.assign(req,value)

    return next()
}

module.exports = validator