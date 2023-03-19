const winston = require('winston')
const path = require('path')

const Logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {
        service: 'user_service'
    },
    transports: [
        new winston.transports.File({filename: path.join(__dirname,'../../','storage/logs/users/error.log'), level: 'error'}),
        new winston.transports.File({filename: path.join(__dirname,'../../','storage/logs/users/info.log'), level: 'info'}),
        new winston.transports.File({filename: path.join(__dirname,'../../','storage/logs/users/combined.log')}),
        // new winston.transports.Console()
    ]
})

module.exports = Logger