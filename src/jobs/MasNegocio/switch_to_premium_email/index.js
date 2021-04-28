import ClientDocument from '../../../models/ClientDocument';
import User from '../../../models/User';
import agenda from '../../../utils/agenda';
import * as Email from '../../../utils/emails';
import rollbar from '../../../utils/rollbar';

import * as utils from './utils';

agenda.define('MasNegocio: switch to premium email', async () => {
  const cards = await ClientDocument.find({ 'value.switch_to_premium_email_sent': false });

  cards.forEach(async card => {
    const has_to_send = utils.should_send_email(card);
    if (!has_to_send) return;

    const user = await User.findById(card.value.user_id);
    if (!user) return rollbar.error('switch_to_premium_email: user not found', { card });

    const data = { card };

    const email = Email.get_email_from_template('masnegocio_premium_advise', 'es', data);
    await Email.send_email('notifications', user.email, email.subject, email.text, email.html, data);

    card.value.switch_to_premium_email_sent = true;
    card.markModified('value');
    card.save();
  });
});
