const express = require('express')
const helmet = require('helmet')
const bootConfig = require('./config')
const loaders = require('./loaders')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const userAddressRoutes = require('./routes/userAddress')
const events = require('./utils/events')
const appLogger = require('./utils/logger/appLogger')
const errorHandler = require('./app/middlewares/ErrorHandler')
const pageNotFound = require('./app/middlewares/PageNotFound')
const expressFileUpload = require('express-fileupload')

bootConfig()
loaders()
events()

const app = express()
app.use(express.json())
app.use(expressFileUpload({
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
        files: 1, // Max One File
    },
    limitHandler: function (req, res, next) {
        const error = new Error('Maksimum dosya boyutu veya sayısı aşıldı')
        error.status = 413
        next(error)
    },
    useTempFiles : true,
    tempFileDir : __dirname + '/storage/tmp',
    createParentPath: true,
    abortOnLimit: true

}))
app.use(helmet())

app.listen(process.env.APP_PORT || 5000, process.env.APP_HOSTNAME, () => {

    appLogger.log({
        level: 'info',
        message: `ExpressJS Running With NodeJS [http://${process.env.APP_HOSTNAME}:${process.env.APP_PORT}] - TIME: ${Date.now()}`
    })

    app.use('/api/v1/users', userRoutes)
    app.use('/api/v1/categories', categoryRoutes)
    app.use('/api/v1/products', productRoutes)
    app.use('/api/v1/user-address', userAddressRoutes)

    app.use(pageNotFound)
    app.use(errorHandler)
})