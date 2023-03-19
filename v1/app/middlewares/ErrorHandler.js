const appLogger = require('../../utils/logger/appLogger')

const errorHandler = (error, req, res, next) => {

    appLogger.log({
        level:'error',
        message: error.stack,
    })

    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message || 'Internal Server Error...',
            status: error.status || 500,
            success: false,
            stack: process.env.NODE_ENV === 'development' ? error.stack : {}
        }
    })
}

module.exports = errorHandler