const bcrypt = require('bcrypt')
const crypto = require('crypto')
const JWT = require('jsonwebtoken')
const httpStatus = require("http-status");
const path = require("path");
const fs = require("fs");
const passwordHash = async password => {
    return bcrypt.hash(password, 10)
}

const verifyPasswordHash = async (password, hash) => {
    return bcrypt.compare(password, hash)
}

const generateAccessToken = data => {
    return JWT.sign({data}, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn: '1h'})
}

const generateRefreshToken = data => {
    return JWT.sign({data}, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: '1h'})
}

const tokenVerify = data => {
    return JWT.verify(data, process.env.ACCESS_TOKEN_SECRET_KEY, async (error, verifyData) => {
        if (error) throw new Error(error.message)
        return verifyData
    })
}

const cryptoRandomBytesToHex = () => {
    return crypto.randomBytes(48).toString('hex')
}

const encodeURIParams = (uri) => {
    return encodeURIComponent(uri).replace(/\./g, '%2E')
}

const decodeURIParams = (uri) => {
    return decodeURIComponent(uri)
}

const addMinute = minute => {
    const tokenExpireDate = new Date();
    return tokenExpireDate.setMinutes(tokenExpireDate.getMinutes() + minute);
}

const generateProductSKU = (productName, category) => {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const sku = `${productName.substring(0, 5)}-${category.substring(0, 3)}-${date}`
    return sku.toUpperCase()
}

const removeWhiteSpace = filename => {
    return filename.replace(/\s+/g, '-').toLowerCase().toString()
}

const generateProductName = fileName => {
    return `product_img_${Date.now()}${path.extname(fileName)}`
}

const ifExistsDeleteImage = file => {
    const productImagePath = `public/images/products/${file}`

    if (fs.existsSync(path.join(__dirname, '../../', productImagePath))) {
        return fs.rmSync(path.join(__dirname, '../../', productImagePath))
    }

}

module.exports = {
    passwordHash,
    verifyPasswordHash,
    generateAccessToken,
    generateRefreshToken,
    tokenVerify,
    cryptoRandomBytesToHex,
    encodeURIParams,
    decodeURIParams,
    addMinute,
    generateProductSKU,
    removeWhiteSpace,
    generateProductName,
    ifExistsDeleteImage
}