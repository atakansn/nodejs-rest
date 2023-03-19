const {Disk, S3} = require('../utils/file-upload/index')
const imageUploadService = async (reqFile,fileName) => {
    switch (process.env.FILE_UPLOAD){
        case 'disk':
            return Disk(reqFile,fileName)

        case 's3':
            return S3(fileName)
    }
}

module.exports = imageUploadService