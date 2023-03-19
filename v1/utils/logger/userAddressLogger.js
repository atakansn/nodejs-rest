const winston = require('winston')
const path = require('path')

const Logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {
        service: 'users_addresses_logger'
    },
    transports: [
        new winston.transports.File({filename: path.join(__dirname,'../../','storage/logs/user_addresses/error.log'), level: 'error'}),
        new winston.transports.File({filename: path.join(__dirname,'../../','storage/logs/user_addresses/info.log'), level: 'info'}),
        new winston.transports.File({filename: path.join(__dirname,'../../','storage/logs/user_addresses/combined.log')}),
        // new winston.transports.Console()
    ]
})

module.exports = Logger