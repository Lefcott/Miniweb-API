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

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Cookie, Set-Cookie'
  );
  res.header('Access-Control-Allow-Credentials', 'true');

  next();
});

app.use(
  cors({
    origin: webOrigins,
    methods: ['get', 'GET', 'POST', 'post', 'PUT', 'put', 'PATCH', 'patch', 'DELETE', 'delete'],
    credentials: true // enable set cookie
  })
);

const sessionMiddleware = (req, res, next) => {
  if ((env.REQUIRE_REDIS === 'TRUE' || redis.isActive()) && req.query.session !== 'false')
    return session({
      secret: 'SuperSecret - (Change it)',
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        maxAge: 60 * 60 * 24 * 1000
      },
      store: new RedisStore({ client: redis.client })
    })(req, res, next);
  // (req, res, (...args) => {
  //   res.header('Set-Cookie', `${res.getHeaders()['set-sookie']}; Secure`);
  //   next(...args);
  // });
  return next();
  // req.session = {};
  // res.header(
  //   'Set-Cookie',
  //   'connect.sid=s%3A8R52PJCJI2dj77a0hDovecIJVkRlGeMx.ZLXqDDOs%2FSfQbBpo9CmGgGsAsue1LmPsMwdd14Ab2xI; Path=/; HttpOnly; SameSite=None; Secure'
  // );
  // next();
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

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});
app.use('/', router);

log('Listen');
const port = env.PORT || process.env.PORT;

server.listen(port, () => {
  log(`Listening on ${port} with environment ${env.NODE_ENV}`);
});

export { app, router, sessionMiddleware };
export const socketIo = SocketIo(server);
