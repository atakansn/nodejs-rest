const BaseService = require('./BaseService')
const UserAddress = require('../app/models/UserAddress')

class UserAddressService extends BaseService {
    constructor() {
        super(UserAddress);
    }
}

module.exports = UserAddressService