const helpers = require('../../utils/helpers')
const httpStatus = require("http-status");
const PasswordResetToken = require('../models/PasswordResetToken')
const eventEmitter = require('../../utils/events/eventEmitter')
const service = require('../../services/UserService')
const UserService = new service()
const UnauthorizedError = require('../errors/UnauthorizedError')
const UserNotFound = require("../errors/UserNotFound");
const EmailAlreadyExists = require("../errors/EmailAlreadyExistsError");
const InvalidQueryParameter = require("../errors/InvalidQueryParameter");

const index = (req, res, next) => {
    UserService.findOne({_id: req.user._id})
        .then(user => {
            if (!user) throw new UserNotFound('Kullanıcı bulanamadı.', httpStatus.NOT_FOUND)
            delete user._doc.password
            res.status(httpStatus.OK).send(user)
        })
        .catch(error => next(error))
}

const create = async (req, res, next) => {
    req.body.password = await helpers.passwordHash(req.body.password)
    UserService.create(req.body)
        .then(userCreate => {
            if (userCreate.email === req.body.email) throw new EmailAlreadyExists('Böyle bir mail adresi mevcut.', httpStatus.CONFLICT)
            res.status(httpStatus.OK).send(userCreate)
        })
        .catch(error => next(error))
}

const update = (req, res, next) => {
    UserService.updateWhere({_id: req.user._id}, req.body)
        .then(userUpdate => {
            if (!userUpdate) throw new UserNotFound('Kullanıcı bulanamadı.', httpStatus.NOT_FOUND)
            delete userUpdate._doc.password
            res.status(httpStatus.OK).send(userUpdate)
        })
        .catch(error => next(error))
}

const destroy = (req, res, next) => {
    UserService.delete(req.user._id)
        .then(user => {
            if (!user) throw new UserNotFound('Kullanıcı bulanamadı.', httpStatus.NOT_FOUND)
            res.status(httpStatus.OK).send({message: 'Kullanıcı Silindi.'})
        })
        .catch(error => next(error))
}

const login = (req, res, next) => {
    UserService.findOne({email: req.body.email})
        .then(async user => {

            if (!user) throw new UserNotFound('Email adresi veya şifre yanlış.', httpStatus.UNAUTHORIZED)

            const passwordVerify = await helpers.verifyPasswordHash(req?.body?.password, user?.password)

            if (!passwordVerify) throw new UserNotFound('Email adresi veya şifre yanlış.', httpStatus.UNAUTHORIZED)

            delete user._doc.password

            const loginUser = {
                user: user,
                tokens: {
                    access_token: helpers.generateAccessToken(user),
                    refresh_token: helpers.generateRefreshToken(user)
                }
            }

            res.status(httpStatus.OK).send(loginUser)
        })
        .catch(error => next(error))
}

const changePassword = async (req, res, next) => {
    req.body.password = await helpers.passwordHash(req.body.password)
    UserService.updateWhere({_id: req.user._id}, {password: req.body.password})
        .then(user => {
            if (!user) throw new UserNotFound('Kullanıcı bulanamadı.', httpStatus.NOT_FOUND)
            res.status(httpStatus.OK).send({message: 'Şifre başarıyla değiştirildi.'})
        })
        .catch(error => next(error))
}

const passwordResetLink = (req, res, next) => {
    UserService.findOne(req.body)
        .then(async user => {
            if (!user) throw new UserNotFound('Kullanıcı bulanamadı.', httpStatus.NOT_FOUND)

            const checkResetToken = await PasswordResetToken.findOne(req.body)

            const token = helpers.cryptoRandomBytesToHex()

            if (!checkResetToken) {
                await new PasswordResetToken({
                    email: user.email,
                    token: token,
                    created_at: helpers.addMinute(30)
                }).save()
            } else {
                await PasswordResetToken.findOneAndUpdate(req.body, {token, created_at: helpers.addMinute(30)})
            }

            const resetLink = `http://localhost:3000/users/password-reset/${token}?email=${helpers.encodeURIParams(user.email)}`

            eventEmitter.emit('send_mail', {
                to: user.email,
                subject: 'Şifre Sıfırlama İşlemi',
                html: require('../../utils/email/emailTemplate')(resetLink, user.first_name)
            })

            res.status(httpStatus.OK).send({message: 'Şifre sıfırlama bağlantısı mail adresinize gönderildi...'})

        })
        .catch(error => next(error))

}

const newPassword = async (req, res, next) => {

    try {
        const checkEncodeURIEmail = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/).test(helpers.decodeURIParams(req.query.email))

        if(Object.keys(req.query).length !== 1 && !req.query.email && !checkEncodeURIEmail){
            throw new InvalidQueryParameter('Geçersiz sorgu parametreleri.',httpStatus.BAD_REQUEST)
        }

        const checkToken = new RegExp(/^[a-fA-F0-9]{96}$/ig).test(req.params.token)

        if (!(req.params.token && req.query.email && checkEncodeURIEmail && checkToken)) {
            throw new UserNotFound('Kullanıcı bulanamadı.', httpStatus.NOT_FOUND)
        }

        const checkPasswordResetToken = await PasswordResetToken.findOne({
            token: req.params.token,
            email: req.query.email
        })

        if (!checkPasswordResetToken) throw new UnauthorizedError('Token veya Email adresi geçersiz.', httpStatus.UNAUTHORIZED)

        const dateNow = new Date(Date.now())

        if (dateNow > checkPasswordResetToken.created_at) {
            await checkPasswordResetToken.deleteOne({
                token: req.params.token,
                email: req.query.email
            })
            return res.status(httpStatus.FORBIDDEN).send({message: 'Token\'in süresi doldu.'})
        }

        const password = await helpers.passwordHash(req.body.password)

        UserService.updateWhere({email: req.query.email}, {password})
            .then(async updatePassword => {
                await checkPasswordResetToken.deleteOne({email: updatePassword.email})
                res.status(httpStatus.OK).send({message: 'Şifre başarıyla değiştirildi.'})
            })
            .catch(error => next(error))

    } catch (error) {
        next(error)
    }
}

module.exports = {
    index,
    create,
    update,
    destroy,
    login,
    passwordResetLink,
    changePassword,
    newPassword
}