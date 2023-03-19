const eventEmitter = require('./eventEmitter')
const nodeMailer = require('nodemailer')

module.exports = () => {
    eventEmitter.on('send_mail',(emailData) => {
        const transporter = nodeMailer.createTransport({
            host:'sandbox.smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: "50441b366c04ed",
                pass: "7a4cc3c194639f"
            }
        })

        transporter.sendMail({
            from: 'nodemailer@mail.com',
            ...emailData
        })
    })
}