import agenda from '../utils/agenda';

import './test';

(async () => {
  await agenda.start();

  // TODO cron jobs here
  await agenda.every('3 minutes', 'agenda test');
})();
