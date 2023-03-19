const winston = require('winston')
const path = require('path')

const Logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {
        service: 'app_system'
    },
    transports: [
        new winston.transports.File({filename: path.join(__dirname, '../../','storage/logs/app.log')}),
        new winston.transports.Console({format: winston.format.simple()})
    ]
})

module.exports = Logger