const httpStatus = require("http-status");
const slugFunc = require('slug')
const service = require('../../services/ProductService')
const ProductService = new service()
const ImageUploadService = require('../../services/ImageUploadService')
const DuplicateDataError = require('../errors/DuplicateDataError')
const BadRequest = require('../errors/BadRequestError')
const NotFound = require('../errors/NotFoundError')
const {generateProductSKU,generateProductName,ifExistsDeleteImage} = require('../../utils/helpers')
const fs = require('fs')

const index = (req, res, next) => {
    ProductService.list()
        .then(products => res.status(httpStatus.OK).send(products))
        .catch(error => next(error))
}

const create = (req, res, next) => {

    ProductService.findOne({name: req.body.name, slug: slugFunc(req.body.name)})
        .then(async findProduct => {

            if (findProduct) throw new DuplicateDataError('Böyle bir ürün zaten mevcut.', httpStatus.CONFLICT)

            req.body.slug = slugFunc(req.body.name)
            req.body.sku = generateProductSKU(req.body.name, req.body.category_id)

            if (!req?.files?.image) throw new BadRequest('Ürün resmi boş bırakılmamalı.', httpStatus.BAD_REQUEST)

            const fileName = generateProductName(req.files.image.name)

            req.body.image = await ImageUploadService(req.files.image, fileName)

            ProductService.create(req.body)
                .then(createCategory => {

                    if(fs.existsSync(req.files.image.tempFilePath)){
                        fs.unlink(req.files.image.tempFilePath,function(err){
                            throw new Error(err)
                        })
                    }

                    res.status(httpStatus.OK).send(createCategory)
                })
                .catch(error => next(error))
        })
        .catch(error => next(error))
}

const update = (req, res, next) => {

    if (req.body.name) {
        req.body.slug = slugFunc(req.body.name)
    }

    if (!req?.files?.image) {
        return ProductService.update({_id: req.params.id}, req.body)
            .then(updateCategory => res.status(httpStatus.OK).send(updateCategory))
            .catch(error => next(error))
    }

    ProductService.findOne({_id: req.params.id})
        .then(async findProduct => {

            ifExistsDeleteImage(findProduct.image)

            const fileName = generateProductName(req.files.image.name)

            req.body.image = await ImageUploadService(req.files.image, fileName)

            ProductService.update({_id: req.params.id}, req.body)
                .then(updateProduct => {

                    if(fs.existsSync(req.files.image.tempFilePath)){
                        fs.unlink(req.files.image.tempFilePath,function(err){
                            throw new Error(err)
                        })
                    }

                    res.status(httpStatus.OK).send(updateProduct)
                })
                .catch(error => next(error))
        })
}

const show = (req, res, next) => {
    ProductService.findOne({_id: req.params.id})
        .populate({
            path: 'category_id',
            select: 'name'
        })
        .then(products => res.status(httpStatus.OK).send(products))
        .catch(error => next(error))
}

const destroy = (req, res, next) => {
    ProductService.delete({_id: req.params.id})
        .then(deleteProduct => {
            if (!deleteProduct) throw new NotFound('Böyle ürün bulunamadı.', httpStatus.NOT_FOUND)

            ifExistsDeleteImage(deleteProduct.image)

            res.status(httpStatus.OK).send({message: 'Ürün Silindi.'})
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