import './load_env';
import './globals';

import './database';
import './utils/middlewares';
import './routes';
import './tasks';
import './sockets';
import './jobs';

process.on('uncaughtException', (err, origin) => {
  console.log(origin);
  console.log(err);
});
