import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class EmailService {


    constructor(

        // Inject Mailer Service 
        private readonly mailerService: MailerService,

    ) { }

    // sendUserWelcomeEmail() function for sending welcome mail to user 
    async sendUserWelcomeEmail(user: User): Promise<any> {
        await this.mailerService.sendMail({
            to: user.email,
            subject: "Welcome To Our App",
            template: process.cwd() + "/src/mail/templates/welcome-user",
            context: {
                name: user.firstName + ' ' + user.lastName
            }
        });
    }

}
