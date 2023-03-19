const BaseService = require('./BaseService')
const Category = require('../app/models/Category')

class CategoryService extends BaseService {
    constructor() {
        super(Category);
    }
}

module.exports = CategoryService