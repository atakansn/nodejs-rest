const NotFoundError = require('../errors/NotFoundError')
const httpStatus = require('http-status')

const idChecker = (req, res, next) => {

    if(!req?.params?.id?.match(/^[0-9a-fA-F]{24}$/)) {
        return next(new NotFoundError('ID parametresi eksik.',httpStatus.BAD_REQUEST))
    }

    next()
}

module.exports = idChecker