import User from '../../models/User';
import env from '../../env.json';
import { sendEmail, getEmailFromTemplate } from '../../utils/emails';
import rollbar from '../../utils/rollbar';

/** @param {import('express').Request} req @param {import('express').Response} res */
export const register = async ({ body, session }, res) => {
  const validationError = await User.getValidationError(body);

  if (validationError) return res.status(422).json({ error: validationError });

  const user = await User.register(body);
  session.user_id = user._id;

  const emailData = {
    name: user.name,
    surname: user.surname,
    verification_link: `${env.URL_PREFIX}${env.DOMAIN_NAME}/email_confirmation?token=${encodeURIComponent(
      user.email_confirmation_token
    )}`
  };
  const email = getEmailFromTemplate('register', session.language_code, emailData);
  sendEmail('confirm', user.email, email.subject, email.text, email.html).catch(rollbar.error);

  res.status(200).json({ message: 'user created' });
};