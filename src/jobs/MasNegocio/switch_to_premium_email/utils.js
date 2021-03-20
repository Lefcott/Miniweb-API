import moment from 'moment';
import parse_duration from 'parse-duration';

const time = parse_duration('1 week');

export const should_send_email = card => moment() - moment(card.createdAt) >= time;
