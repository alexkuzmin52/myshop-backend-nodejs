import * as EmailTemplates from 'email-templates';
import * as nodemailer from 'nodemailer';
import * as path from 'path';

import {ActionEnum, ResponseStatusCodeEnum} from '../../constants';
import {ErrorHandler} from '../../errors';
import {config} from '../../config';
import {htmlTemplates} from '../../email-templates';

if (
  !config.FRONTEND_URL
  || !config.ROOT_EMAIL_SERVICE
  || !config.ROOT_EMAIL
  || !config.ROOT_EMAIL_PASSWORD
) {
  throw Error('Root email credentials are not defined!');
}

const contextExtension = {
  frontendUrl: config.FRONTEND_URL
};

const transporter = nodemailer.createTransport(
  {
    service: config.ROOT_EMAIL_SERVICE,
    auth: {
      user: config.ROOT_EMAIL,
      pass: config.ROOT_EMAIL_PASSWORD
    }
  }
);

const emailTemplates = new EmailTemplates(
  {
    message: {},
    views: {
      root: path.resolve(__dirname, '../../', 'email-templates')
    }
  }
);

export class MailService {
  async sendEmail(email: string, action: ActionEnum, context: any = {}): Promise<void> {
    const templateInfo = htmlTemplates[action];

    if (!templateInfo) {
      throw new ErrorHandler(ResponseStatusCodeEnum.SERVER, 'Template not found (');
    }

    Object.assign(context, contextExtension);

    const html = await emailTemplates.render(templateInfo.templateFileName, context);

    await transporter.sendMail(
      {
        from: `NO REPLY <${config.ROOT_EMAIL}>`,
        to: email,
        subject: templateInfo.subject,
        html
      }
    );
  }
}

export const mailService = new MailService();

