import Item from '../../models/Item';
import User from '../../models/User';
import agenda from '../../utils/agenda';
import * as Email from '../../utils/emails';
import rollbar from '../../utils/rollbar';

import * as utils from './utils';

agenda.define('last payment emails', async ({ attrs }) => {
  attrs.data.iterations.forEach(async iteration => {
    const complete_email_sent_flag = `payments.${iteration.email_sent_flag}`;
    const items = await Item.find({ enabled: true, [complete_email_sent_flag]: false });

    items.forEach(async client_document => {
      const has_to_send = utils.should_send_email(client_document, iteration.duration);
      if (!has_to_send) return;

      const user = await User.findById(client_document.value.user_id);
      if (!user) rollbar.error('payment emails: user not found', { client_document });

      const data = { client_document };
      const email = Email.get_email_from_template(iteration.email_template, iteration.language, data);
      await Email.send_email('notifications', user.email, email.subject, email.text, email.html, data);

      client_document.payments[client_document.payments.length - 1][iteration.email_sent_flag] = true;
      client_document.markModified('payments');
      client_document.save();
    });
  });
});
