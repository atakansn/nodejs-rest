const path = require('path')
const httpStatus = require("http-status");
const InvalidMimeType = require('../../app/errors/InvalidMimeTypeError')
const InvalidExtension = require('../../app/errors/InvalidExtensionError')

const disk = async (reqFile, fileName) => {

    const allowedExtensions = /jpeg|jpg|png|webp/

    if (!allowedExtensions.test(reqFile?.name.split('.').pop())) {
        throw new InvalidExtension('Geçersiz dosya uzantısı.', httpStatus.UNSUPPORTED_MEDIA_TYPE)
    }

    if (!reqFile.mimetype.startsWith('image/')) {
        throw new InvalidMimeType('Sadece resim dosyaları yükleyebilirisiniz.', httpStatus.UNSUPPORTED_MEDIA_TYPE)
    }

    const imagePath = 'public/images/products';
    const folderPath = path.join(__dirname, '../../', imagePath, fileName)
    await reqFile.mv(folderPath)

    return fileName
}

module.exports = disk