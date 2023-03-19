const BaseService = require('./BaseService')
const User = require('../app/models/User')

class UserService extends BaseService {
    constructor() {
        super(User);
    }
}

module.exports = UserService