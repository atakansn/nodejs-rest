const express = require('express')
const router = express.Router()
const {index, destroy, show, update, create} = require('../app/controllers/ProductController')
const validator = require('../app/middlewares/RequestValidator')
const productValidation = require('../app/validations/ProductValidation')
const checkID = require('../app/middlewares/CheckID')

router.route('/').get(index)
router.route('/:id').get(checkID, show)
router.route('/').post(validator(productValidation.createValidation), create)
router.route('/:id').patch(checkID, validator(productValidation.updateValidation), update)
router.route('/:id').delete(checkID, destroy)

module.exports = router