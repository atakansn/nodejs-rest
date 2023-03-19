const httpStatus = require("http-status");
const service = require('../../services/UserAdressService')
const UserAddressService = new service()
const NotFound = require('../errors/NotFoundError')

const index = (req, res, next) => {
    UserAddressService.list({user_id: req.user._id})
        .populate({
            path:'user_id',
            select:'first_name last_name email'
        })
        .then(addresses => {
            if (!addresses) throw new NotFound('Kullanıcı adresi bulunamadı/henüz adresi kaydı mevcut değil.',httpStatus.NOT_FOUND)
            res.status(httpStatus.OK).send(addresses)
        })
        .catch(error => next(error))
}

const create = (req, res, next) => {
    UserAddressService.create(req.body)
        .then(createAddress => res.status(httpStatus.OK).send(createAddress))
        .catch(error => next(error))
}

const update = (req, res, next) => {
    UserAddressService.update({user_id: req.user._id}, req.body)
        .then(updateAddress => {
            if(!updateAddress)throw new NotFound('Kullanıcı adresi bulunamadı/henüz adresi kaydı mevcut değil.',httpStatus.NOT_FOUND)
            res.status(httpStatus.OK).send(updateAddress)
        })
        .catch(error => next(error))
}

const show = (req, res, next) => {
    UserAddressService.list({user_id: req.user._id})
        .then(address => {
            if(!address)throw new NotFound('Kullanıcı adresi bulunamadı/henüz adresi kaydı mevcut değil.',httpStatus.NOT_FOUND)
            res.status(httpStatus.OK).send(address)
        })
        .catch(error => next(error))
}

const destroy = (req, res, next) => {
    UserAddressService.delete({user_id: req.user._id})
        .then(address => {
            if(!address)throw new NotFound('Kullanıcı adresi bulunamadı/henüz adresi kaydı mevcut değil.',httpStatus.NOT_FOUND)
            res.status(httpStatus.OK).send({message: 'Kullanıcı adresi silindi.'})
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