import agenda from '../../utils/agenda';

import '../last_payment_emails';

import './switch_to_premium_email';

export default async () => {
  await agenda.every('5 hours', 'MasNegocio: switch to premium email');
  await agenda.every('5 hours', 'last payment emails', {
    iterations: [
      {
        language: 'es',
        duration: '1 year - 1 week',
        email_template: 'masnegocio_payment_reminder',
        email_sent_flag: 'payment_reminder_email_sent'
      },
      {
        language: 'es',
        duration: '1 year',
        email_template: 'masnegocio_payment_expired',
        email_sent_flag: 'service_expired_email_sent'
      },
      {
        language: 'es',
        duration: '1 year + 1 week',
        email_template: 'masnegocio_card_disabled',
        email_sent_flag: 'service_disabled_email_sent'
      }
    ]
  });
};
