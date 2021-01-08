import parseHttpHeader from 'parse-http-header';
import { v4 as uuid } from 'uuid';

import * as redis from '../redis';

const sessionKey = 'session';
const sessionExpireSeconds = 3600 * 24;

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async (req, res, next) => {
  let session;
  let { 'connect.sid': connectSid } = parseHttpHeader(`Cookie: ; ${req.headers.cookie}`);

  const finalSessionKey = `${sessionKey}:${connectSid}`;
  req.session = {};

  if (connectSid) {
    session = await redis.Get(finalSessionKey);
    if (session) req.session = JSON.parse(session);
  } else connectSid = uuid();

  res.setHeader(
    'Set-Cookie',
    `connect.sid=${connectSid}; Path=/; HttpOnly${req.secure ? '; SameSite=None; Secure' : ''}`
  );

  res.on('finish', async () => {
    const newSession = JSON.stringify(req.session);

    if (newSession !== session) await redis.Set(finalSessionKey, newSession, sessionExpireSeconds);
  });

  next();
};
