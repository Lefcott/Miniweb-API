import parseHttpHeader from 'parse-http-header';
import { v4 as uuid } from 'uuid';

import * as redis from '../redis';

const sessionKey = 'session';
const sessionExpireSeconds = 3600 * 24;

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async (req, res, next) => {
  let session;
  const { 'connect.sid': connectSid } = parseHttpHeader(req.headers.cookie);

  const finalSessionKey = `${sessionKey}:${connectSid}`;
  req.session = {};

  if (connectSid) {
    session = await redis.Get(finalSessionKey);
    if (session) req.session = JSON.parse(session);
  }

  res.setHeader('Set-Cookie', `connect.sid=${connectSid}; Path=/; HttpOnly; SameSite=None; Secure`);

  res.on('finish', async () => {
    const newSession = JSON.stringify(req.session);

    log('session', session);
    log('newSession', newSession);

    if (newSession !== session) await redis.Set(finalSessionKey, newSession, sessionExpireSeconds);
  });

  next();
};
