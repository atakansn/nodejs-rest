const pageNotFound = (req,res,next) => {
    const error = new Error('Aradığınız Sayfa Bulunamadı...')
    error.status = 404
    next(error)
}

module.exports = pageNotFound