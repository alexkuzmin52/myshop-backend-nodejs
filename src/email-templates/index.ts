import {ActionEnum} from '../constants';

export const htmlTemplates: {[index: string]: {subject: string, templateFileName: string}} = {
  [ActionEnum.USER_REGISTER]:{
    subject: 'Welcome !',
    templateFileName: 'user-welcome'
  },
  [ActionEnum.USER_FORGOT_PASSWORD]:{
    subject: 'Forgot password ?',
    templateFileName: 'user-forgot'
  }
};
