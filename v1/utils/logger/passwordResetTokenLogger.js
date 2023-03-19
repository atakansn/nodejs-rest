const winston = require('winston')
const path = require('path')

const Logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {
        service: 'password_reset_token_service'
    },
    transports: [
        new winston.transports.File({filename: path.join(__dirname,'../../','storage/logs/password_reset_token/error.log'), level: 'error'}),
        new winston.transports.File({filename: path.join(__dirname,'../../','storage/logs/password_reset_token/info.log'), level: 'info'}),
        new winston.transports.File({filename: path.join(__dirname,'../../','storage/logs/password_reset_token/combined.log')}),
        // new winston.transports.Console()
    ]
})

module.exports = Logger