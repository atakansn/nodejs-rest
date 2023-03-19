const httpStatus = require('http-status')
const JWT = require('jsonwebtoken')
const service = require('../../services/UserService')
const UserService = new service()
const UserNotFound = require('../errors/UserNotFound')

const authenticateToken = async (req, res, next) => {

    try {
        const token = req.headers.authorization?.split(' ')[1] || null

        if (!token) {
            return res.status(httpStatus.UNAUTHORIZED).send({
                error:{
                    message: 'Lütfen giriş yapın.',
                    status: httpStatus.UNAUTHORIZED,
                    success: false,
                    type: 'UNAUTHORIZED'
                }
            })

            //throw new UserNotFound('Expire.',httpStatus.NOT_FOUND)
        }

        const decodedToken = await JWT.verify(token, process.env.JWT_ACCESS_SECRET_KEY)

        req.user = decodedToken.data

        const checkUser = await UserService.findOne({_id: req.user._id})

        if(!checkUser) throw new UserNotFound('Kullanıcı Bulunamadı.',httpStatus.NOT_FOUND)

        next()

    } catch (err) {
        return res.status(httpStatus.FORBIDDEN).send({
            error:{
                message: 'Geçersiz Token.',
                status: httpStatus.FORBIDDEN,
                success: false,
                type: 'FORBIDDEN'
            }
        })

        //return next(err)
    }
}

module.exports = authenticateToken