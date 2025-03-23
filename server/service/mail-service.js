const nodemailer = require('nodemailer')

class MailService{
    
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth:{
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            },
            logger: true,
            debug: true,
            connectionTimeout: 10000, 
            greetingTimeout: 10000, 
            socketTimeout: 10000
        })
    }

    async sendActivationMail(to, link, username){
        console.log(to, link)
        await this.transporter.sendMail({
             from: process.env.SMTP_USER,
             to: to,
             subject: 'Активация аккаунта на сайте',
             text: `${link}`,
             html: `
                <div>
                    <h1>${username}, для активации аккаунта перейдите по ссылке</h1>
                    <a href = "${link}">${link}</a>
                    <div>Если вы не регестрировались на сайте, то обратитесь в поддержку по номеру +7 965 675 9447</div>
                </div>
                `

        })
        console.log("сво")
    }

}

module.exports = new MailService()