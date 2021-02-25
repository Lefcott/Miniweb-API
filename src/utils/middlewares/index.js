import rollbar from '../rollbar';
import * as redis from '../redis';

import sessionMiddleware from './session';
import moesifMiddleware from './moesif';

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const http = require('http');

const webOrigins = JSON.parse(process.env.WEB_ORIGINS);
const app = express();
const server = http.createServer(app);

app.use(cookieParser());

app.use((req, res, next) => {
  const origin = req.get('origin');

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Cookie, Set-Cookie'
  );
  res.header('Access-Control-Allow-Origin', origin);

  next();
});

app.use(
  cors({
    origin: webOrigins,
    methods: ['get', 'GET', 'POST', 'post', 'PUT', 'put', 'PATCH', 'patch', 'DELETE', 'delete'],
    credentials: true // enable set cookie
  })
);

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
app.use(moesifMiddleware);

app.get('/', (req, res) => {
  res.send(`Hello World from ${req.get('host')} !`);
});
app.use('/', router);

log('Listen');
const port = process.env.PORT || process.process.env.PORT;

server.listen(port, () => {
  log(`Listening on ${port} with environment ${process.env.NODE_ENV}`);
});

export { app, server, router, sessionMiddleware };
