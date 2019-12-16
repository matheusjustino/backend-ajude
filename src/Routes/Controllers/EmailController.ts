import IUsuarioModel from "../../interfaces/IUsuarioModel";

const { emailConfig } = require("../../configs/Config");
const nodeMailer = require("nodemailer");
const Logger = require("../../logger/winston").Logger;
const logger = new Logger("[EmailController]");


class EmailController {
    private emailSistema: string = emailConfig.emailSistema;
    private senhaSistema: string = emailConfig.senhaSistema;
    private service: string = emailConfig.service;

    boasVindasEmail({ primeiroNome, ultimoNome, email }: IUsuarioModel) {
        try {
            const emailDestino = email;
            
            const assuntoEmail = "E-mail de Boas-Vindas!";
            
            const textoEmail = `Olá ${primeiroNome} ${ultimoNome}, muito obrigado pela sua inscrição no AJuDE!`;

            const transporter = nodeMailer.createTransport({
                service: this.service,
                auth: {
                    user: this.emailSistema,
                    pass: this.senhaSistema
                }
            });

            const mailOptions: { [key: string]: string } = {
                to: emailDestino,
                subject: assuntoEmail,
                text: textoEmail
            };

            transporter.sendMail(mailOptions, (error: string, response: any) => {
                if (error) {
                    logger.error(error);
                } else {
                    logger.info("[Boas-Vindas] Email de boas-vindas enviado para: " + email);
                }
            });
        } catch (error) {
            logger.error(error);

            return error;
        }
    }
}

const emailController = new EmailController();
export default emailController;