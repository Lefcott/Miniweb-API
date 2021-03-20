const Agenda = require('agenda');

/** @type {Agenda.Agenda} */
const agenda = new Agenda({ db: { address: process.env.MONGODB_URI } });

export default agenda;
