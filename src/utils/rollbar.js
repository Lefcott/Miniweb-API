import Rollbar from 'rollbar';

import env from '../env.json';

export default new Rollbar({
  accessToken: env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: env.NODE_ENV,
  verbose: true,
  itemsPerMinute: 500,
  maxItems: 500000
});
