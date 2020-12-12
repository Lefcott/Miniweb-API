import env from '../env.json';
import User from '../models/User';
import { sendEmail, getEmailFromTemplate } from '../utils/emails';
import { hash, compare, largeID, randomCode } from '../utils/passwords';
import * as redis from '../utils/redis';
import * as sms from '../utils/sms';
import rollbar from '../utils/rollbar';

/** @param {import('express').Request} req @param {import('express').Response} res */
export const register = async ({ body, session }, res) => {
  const user = await User.register(body);
  const emailData = {
    name: user.name,
    surname: user.surname,
    verification_link: `${env.URL_PREFIX}${env.DOMAIN_NAME}/email_confirmation?token=${encodeURIComponent(
      user.email_confirmation_token
    )}`
  };
  const email = getEmailFromTemplate('register', session.language_code, emailData);
  sendEmail('confirm', user.email, email.subject, email.text, email.html).catch(error =>
    rollbar.error(error)
  );

  res.status(200).json({ message: 'user created' });
};
