const aws = require("aws-sdk");

const initAwsS3 = async (fileName) =>  {
    const S3 = new aws.S3({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
    })

    return await S3.upload({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileName,
        Body: fileName,
        ACL: process.env.AWS_S3_ACL
    }).promise()
}

module.exports = initAwsS3