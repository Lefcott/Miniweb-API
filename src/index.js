import './load_env';
import './globals';

import './database';
import './utils/middlewares';
import './routes';
import './tasks';

process.on('uncaughtException', (err, origin) => {
  console.log(origin);
  console.log(err);
});
