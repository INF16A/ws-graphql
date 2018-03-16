import {createTestAccount, createTransport, getTestMessageUrl, SendMailOptions, Transporter} from "nodemailer";

export class Mail
{
    private mailTransport: Transporter;
    private isTestMode: boolean;

    public async connect() {
        this.mailTransport = await createTransport(await this.getTransportOptions());
    }

    public async sendMail(options: SendMailOptions) {
        let info = await this.mailTransport.sendMail({
            from: process.env.MAIL_SENDER,
            ...options
        });
        if(this.isTestMode) {
            console.log(`Preview URL: ${getTestMessageUrl(info)}`);
        }
    }

    public async sendTestMail() {
        console.log('Trying to send test mail');
        await this.sendMail({
            from: process.env.MAIL_SENDER,
            to: 'Test <patricksilashahn@gmx.net>',
            subject: 'Testmail',
            text: 'This is a testmail from patrick246'
        });
    }

    private async getTransportOptions(): Promise<any> {
        if("MAIL_TEST" in process.env && process.env.MAIL_TEST === "true") {
            this.isTestMode = true;
            let account = await createTestAccount();
            return {
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: account.user, // generated ethereal user
                    pass: account.pass // generated ethereal password
                }
            }
        } else {
            return {
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                secure: process.env.MAIL_TLS,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASSWORD
                },
                debug: true,
                logger: true
            }
        }
    }
}