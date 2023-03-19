const express = require('express')
const router = express.Router()
const validator = require('../app/middlewares/RequestValidator')
const userValidation = require('../app/validations/UserValidation')
const {
    login,
    destroy,
    update,
    index,
    create,
    passwordResetLink,
    newPassword, changePassword
} = require('../app/controllers/UserController')
const checkAuthenticate = require('../app/middlewares/Authenticate')

router.route('/').get(checkAuthenticate, index)
router.route('/').post(validator(userValidation.createValidation), create)
router.route('/').patch(checkAuthenticate, validator(userValidation.updateValidation), update)
router.route('/').delete(checkAuthenticate, destroy)

router.route('/password-reset').post(validator(userValidation.resetPasswordLinkValidation), passwordResetLink)
router.route('/password-reset/:token').post(validator(userValidation.confirmPasswordValidation), newPassword)

router.route('/password-change').patch(checkAuthenticate,validator(userValidation.changePasswordValidation),changePassword)

router.route('/login').post(validator(userValidation.loginValidation), login)

module.exports = router