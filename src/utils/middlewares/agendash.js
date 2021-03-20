import Agendash from 'agendash';

import agenda from '../agenda';

export default app => {
  app.use('/jobs', Agendash(agenda));
};
