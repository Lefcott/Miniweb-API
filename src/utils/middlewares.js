import SocketIo from 'socket.io';

import rollbar from './rollbar';
import * as redis from './redis';

const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const http = require('http');

const env = require('../env.json');

const webOrigins = JSON.parse(env.WEB_ORIGINS);
const app = express();
const server = http.createServer(app);

app.use((req, res, next) => {
  const origin = req.get('origin');

  console.log('origin', origin);
  console.log('body', req.body);
  console.log('headers', req.headers);

  res.header('Access-Control-Allow-Origin', origin);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Cookie, Set-Cookie'
  );
  next();
});

app.use(
  cors({
    origin: webOrigins,
    methods: ['get', 'GET', 'POST', 'post', 'PUT', 'put', 'PATCH', 'patch', 'DELETE', 'delete'],
    credentials: true // enable set cookie
  })
);

const sessionMiddleware = (...args) => {
  if ((env.REQUIRE_REDIS === 'TRUE' || redis.isActive()) && args[0].query.session !== 'false')
    return session({
      cookie: { sameSite: 'none' },
      store: new RedisStore({ client: redis.client }),
      secret: env.WEB_SESSION_SECRET,
      saveUninitialized: true,
      resave: false
    })(...args);
  args[0].session = {};
  args[2]();
};

const router = express.Router();
app.disable('x-powered-by');
app.use((req, res, next) => {
  if (req.headers['content-type'] === 'text/plain') return next();
  express.json({
    type: ['application/json', 'text/plain']
  })(req, res, next);
});
app.use(rollbar.errorHandler());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.status(200).send('Hello World!'));
app.use('/', router);

log('Listen');
const port = env.PORT || process.env.PORT;

server.listen(port, () => {
  log(`Listening on ${port} with environment ${env.NODE_ENV}`);
});

export { app, router, sessionMiddleware };
export const socketIo = SocketIo(server);
