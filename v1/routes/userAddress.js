const express = require('express')
const router = express.Router()
const validator = require('../app/middlewares/RequestValidator')
const userAddressValidation = require('../app/validations/UserAddressValidation')
const {
    destroy,
    update,
    index,
    create,
    show
} = require('../app/controllers/UserAdressController')
const checkAuthenticate = require('../app/middlewares/Authenticate')

router.route('/').get(checkAuthenticate, index)
router.route('/').post(checkAuthenticate, validator(userAddressValidation.createValidation), create)
router.route('/').patch(checkAuthenticate, validator(userAddressValidation.updateValidation), update)
router.route('/').get(checkAuthenticate, show)
router.route('/').delete(checkAuthenticate, destroy)

module.exports = router