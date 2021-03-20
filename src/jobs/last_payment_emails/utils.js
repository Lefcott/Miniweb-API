import moment from 'moment';
import parse_duration from 'parse-duration';

export const should_send_email = (card, duration) => {
  const time = parse_duration(duration);
  const last_payment = card.payments[card.payments.length - 1];

  if (!last_payment) return false;

  return moment() - moment(last_payment.date) >= time;
};
