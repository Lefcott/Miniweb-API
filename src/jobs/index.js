import agenda from '../utils/agenda';

import ScheduleMasNegocio from './MasNegocio';

(async () => {
  await agenda.start();

  await ScheduleMasNegocio();
})();
