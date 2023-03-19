const dotenv = require('dotenv')
const {join} = require('path')

const bootConfig = () => {
    dotenv.config({
        path: join(__dirname, '../../','.env')
    })
}

module.exports = bootConfig