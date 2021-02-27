import User from '../../models/User';
import { send_email, get_email_from_template } from '../../utils/emails';
import rollbar from '../../utils/rollbar';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ params, body, session }, res) => {
  await User.validate_creation(params, body);

  const user = await User.create(params.project_code, body);
  session.user_id = user._id;

  const emailData = {
    name: user.data.name,
    surname: user.data.surname,
    verification_link: `${process.env.URL_PREFIX}${
      process.env.DOMAIN_NAME
    }/api/email_confirmation?token=${encodeURIComponent(user.email_confirmation_token)}`
  };
  const email = get_email_from_template('register', session.language_code, emailData);
  send_email('confirm', user.email, email.subject, email.text, email.html).catch(rollbar.error);

  res.json({ message: 'user created' });
};
