const initAwsS3 = require('../aws-s3')
const S3Cloud = async (fileName) => {
    return (await initAwsS3(fileName)).Location
}

module.exports = S3Cloud