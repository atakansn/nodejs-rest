const service = require('../../services/CategoryService')
const httpStatus = require("http-status");
const CategoryService = new service()
const RecordAlreadyExists = require('../errors/RecordAlreadyExists')
const NotFound = require('../errors/NotFoundError')
const slugFunc = require('slug')

const index = (req, res, next) => {
    CategoryService.list()
        .then(categories => res.status(httpStatus.OK).send(categories))
        .catch(error => next(error))
}

const create = (req, res, next) => {
    req.body.slug = slugFunc(req.body.name)
    CategoryService.create(req.body)
        .then(createCategory => {
            if ((createCategory.name === req.body.name) && (createCategory.slug === slugFunc(req.body.name))) throw new RecordAlreadyExists('Böyle kategori zaten mevcut.', httpStatus.CONFLICT)
            res.status(httpStatus.OK).send(createCategory)
        })
        .catch(error => next(error))
}

const update = (req, res, next) => {
    req.body.slug = slugFunc(req.body.name)
    CategoryService.update(req.params.id, req.body)
        .then(updateCategory => {
            if (!updateCategory) throw new NotFound('Kategori bulunamadı.', httpStatus.NOT_FOUND)
            res.status(httpStatus.OK).send(updateCategory)
        })
        .catch(error => next(error))
}

const show = (req, res, next) => {
    CategoryService.list({_id: req.params.id})
        .then(category => {
            if (!category) throw new NotFound('Kategori bulunamadı.', httpStatus.NOT_FOUND)
            res.status(httpStatus.OK).send(category)
        })
        .catch(error => next(error))
}

const destroy = (req, res, next) => {
    CategoryService.delete({_id: req.params.id})
        .then(category => {
            if (!category) throw new NotFound('Kategori bulunamadı.', httpStatus.NOT_FOUND)
            res.status(httpStatus.OK).send({message: 'Category Silindi.'})
        })
        .catch(error => next(error))
}

module.exports = {
    index,
    create,
    update,
    show,
    destroy
}