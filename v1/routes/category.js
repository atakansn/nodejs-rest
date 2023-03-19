const express = require('express')
const router = express.Router()
const {index, destroy, show, update, create} = require('../app/controllers/CategoryController')
const validator = require('../app/middlewares/RequestValidator')
const categoryValidation = require('../app/validations/CategoryValidation')
const checkID = require('../app/middlewares/CheckID')

router.route('/').get(index)
router.route('/:id').get(checkID, show)
router.route('/').post(validator(categoryValidation.createValidation), create)
router.route('/:id').patch(checkID, validator(categoryValidation.updateValidation), update)
router.route('/:id').delete(checkID, destroy)

module.exports = router