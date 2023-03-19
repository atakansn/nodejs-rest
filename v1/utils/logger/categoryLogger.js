const winston = require('winston')
const path = require('path')

const Logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {
        service: 'category_service'
    },
    transports: [
        new winston.transports.File({filename: path.join(__dirname, '../../','storage/logs/categories/app.log'), level: 'error'}),
        new winston.transports.File({filename: path.join(__dirname, '../../','storage/logs/categories/app.log'), level: 'info'}),
        new winston.transports.File({filename: path.join(__dirname, '../../','storage/logs/categories/app.log')}),
        // new winston.transports.Console()
    ]
})

module.exports = Logger