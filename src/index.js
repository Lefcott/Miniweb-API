import './load_env';
import './globals';

import './utils/middlewares';
import './routes/schemas';
import './database';
import './tasks';

process.on('uncaughtException', (err, origin) => {
  console.log(origin);
  console.log(err);
});
