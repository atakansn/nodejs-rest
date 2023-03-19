const winston = require('winston')
const path = require('path')

const Logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {
        service: 'product_service'
    },
    transports: [
        new winston.transports.File({filename: path.join(__dirname,'../../','storage/logs/products/error.log'), level: 'error'}),
        new winston.transports.File({filename: path.join(__dirname,'../../','storage/logs/products/info.log'), level: 'info'}),
        new winston.transports.File({filename: path.join(__dirname,'../../','storage/logs/products/combined.log')}),
        // new winston.transports.Console()
    ]
})

module.exports = Logger