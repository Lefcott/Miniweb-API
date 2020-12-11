import env from '../../env.json';
import { User } from '../../database/models';
import { send, getEmail } from '../../utils/emails';
import { encrypt, compare, largeID, randomCode } from '../../utils/passwords';
import * as redis from '../../utils/redis';
import * as sms from '../../utils/sms';

module.exports = {
  continue: async (req, res) => {
    const { name, surname, password, language } = req.body;
    let { email, phone } = req.body;
    email = email.trim().toLowerCase();
    phone = phone.toString().replace(/\D/g, '');

    const User = await user.get({ Email: email });
    if (!User) return res.status(500).json({ error: 'Error searching users' });
    if (User.length) return res.status(409).json({ error: 'User already exists' });

    req.session.register = {
      name: `${name[0].toUpperCase()}${name.substr(1).toLowerCase()}`,
      surname: `${surname[0].toUpperCase()}${surname.substr(1).toLowerCase()}`,
      email: email.trim().toLowerCase(),
      phone,
      language,
      password
    };
    const code = randomCode(5);
    const result = await redis.Set(`phone_code:${phone}`, code, 60 * 15);
    if (!result || !result.added || !result.expired)
      return res.status(500).json({ error: 'Could not create the phone code', result });
    const sent = await sms.send(phone, `${code} es tu código de verificación para registrarte en DancotLL`);
    const { error } = sent;
    if (error) return res.status(500).json(error);
    res.redirect('/continue');
  },
  register: async (req, res) => {
    let { name, surname } = req.body;
    const { phone, phone_code } = req.body;
    const savedCode = await redis.Get(`phone_code:${phone}`);
    if (!savedCode)
      return res.status(422).json({ error: 'Phone not verified', error_code: 'phone_not_verified' });
    if (savedCode !== phone_code)
      return res.status(422).json({ error: 'Phone code does not match', error_code: 'phone_not_match' });
    name = `${name[0].toUpperCase()}${name.substr(1).toLowerCase()}`;
    surname = `${surname[0].toUpperCase()}${surname.substr(1).toLowerCase()}`;
    const { password, language } = req.body;
    const email = req.body.email.trim().toLowerCase();
    const User = await user.get({ Email: email });
    if (!User) return res.status(500).json({ error: 'Error searching users' });
    if (User.length) return res.status(409).json({ error: 'User already exists' });

    const confirmID = largeID(2);
    const saved = await user.save({
      Email: email,
      Phone: phone,
      ConfirmID: confirmID,
      Confirmed: false,
      Language: language,
      Name: name,
      Surname: surname,
      Password: await encrypt(password)
    });
    if (!saved) return res.status(500).json({ error: 'Error saving user' });

    const { html, text } = getEmail('register', language, {
      Name: name,
      Surname: surname,
      VerificationLink: `${env.URL_PREFIX}${env.DOMAIN_NAME}/api/confirm_register/${confirmID}`
    });
    const sent = await send(null, email, 'Register', text, html);
    if (!sent) return res.status(500).json({ error: 'Could not send email' });
    res.status(200).json({ message: 'Email Sent', sent });
    delete req.session.register;
    req.session.save();
  },
  confirmRegister: async (req, res) => {
    const { confirmID } = req.params;

    const Users = await user.get({ ConfirmID: confirmID });
    if (!Users) return res.status(500).json({ error: 'Error searching users' });
    if (!Users.length) return res.status(404).json({ error: 'User not found' });
    const [User] = Users;
    if (User.Confirmed) return res.redirect('/login');
    req.session.user = User;
    res.redirect('/home');
    user.update({ _id: User._id }, { $set: { Confirmed: true } });
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    let User = await user.get({ Email: email });
    if (!User) return res.status(500).json({ error: 'Error searching users' });
    if (!User.length) return res.status(401).json({ error: 'Incorrect email or password' });
    [User] = User;
    if (!compare(password, User.Password))
      return res.status(401).json({ error: 'Incorrect email or password' });
    req.session.user = User;
    res.status(200).json({ redirect: '/home' });
  }
};
