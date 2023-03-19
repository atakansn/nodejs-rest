const BaseService = require('./BaseService')
const Product = require('../app/models/Product')

class ProductService extends BaseService {
    constructor() {
        super(Product);
    }
}

module.exports = ProductService