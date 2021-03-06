import { check } from '@lefcott/filter-json';
import { log } from 'debug';

import rollbar from './rollbar';

const redis = require('redis').createClient(process.env.REDISCLOUD_URL);

let active = false;

redis.on('error', err => {
  console.error(`Redis error: ${err}`);
});

redis.on('end', () => {
  active = false;
  log('Redis connection closed');
});

redis.on('connect', () => {
  active = true;
  log('Connected to REDIS!');
});

export const isActive = () => active;

/**
 * Finds documents on redis, returning array of JSON and array of strings or null
 * @param {string} key Redis key to search on
 * @param {*} where Where filter
 * @returns {Promise.<{string: string[], json: *[]}>}
 */
export const Find = (key, where = {}) =>
  new Promise(resolve => {
    redis.smembers(key, (error, docs) => {
      if (error) throw error;
      const results = { string: [], json: [] };
      if (docs.length === 0) return resolve(results);
      const objs = docs.map(doc => JSON.parse(doc));
      for (let k = 0; k < objs.length; k += 1)
        if (check(objs[k], where)) {
          results.string.push(docs[k]);
          results.json.push(objs[k]);
        }
      resolve(results);
    });
  });

/**
 * Add documents to redis, returning true, false or null
 * @param {string} key Key to add register on
 * @param {*[]} registers Registers to add
 * @returns {Promise.<number>}
 */
export const Add = (key, registers) =>
  new Promise(resolve => {
    let regs = Array.isArray(registers) ? registers : [registers];
    regs = regs.map(reg => JSON.stringify(reg));
    redis.sadd(key, ...regs, (error, added) => {
      if (error) throw error;
      resolve(added);
    });
  });

/**
 * Adds a value to a key to Redis
 * @param {string} key Key to set value
 * @param {string} value Value to set
 * @param {number} expire DEFAULT null expiration in seconds
 * @returns {Promise.<{added: string, expired: number}>}
 */
export const Set = (key, value, expire = null) =>
  new Promise(resolve => {
    redis.set(key, value, (error, added) => {
      if (error) throw error;
      if (!expire || typeof expire !== 'number') return resolve({ added, expired: 0 });
      redis.expire(key, expire, (expError, expired) => {
        if (expError) throw expError;
        resolve({ added, expired });
      });
    });
  });

/**
 * Gets the value of a key
 * @param {string} key Key to set value
 * @param {string} value Value to set
 * @param {number} expire DEFAULT null expiration in seconds
 * @returns {Promise.<{added: number, expired: number}>}
 */
export const Get = key =>
  new Promise(resolve => {
    redis.get(key, (error, result) => {
      if (error) throw error;
      resolve(result);
    });
  });

/**
 * Removes documents in redis, returning number of deleted documets or null
 * @param {string} key Key to add register on
 * @param {*} where Where filter
 * @returns {Promise.<number>}
 */
export const Delete = (key, where = {}) =>
  new Promise(async resolve => {
    const { string: regs } = await Find(key, where);
    if (!regs) return resolve(null);
    if (regs.length === 0) return resolve(0);
    redis.srem(key, ...regs, (error, deleted) => {
      if (error) throw error;
      resolve(deleted);
    });
  });

/**
 * Updates documents on redis, returning number of updated registers or null
 * @param {string} key Redis key to search on
 * @param {*} where Where filter (Used when strRegisters is not passed)
 * @param {*} update JSON containing values to be updated
 * @param {string[]=} strRegisters If passed, it will update these registers instead of using where
 * @returns {Promise.<number>} Number of updated documents
 */
export const Update = (key, where = {}, update, strRegisters) =>
  new Promise(async resolve => {
    let regs;
    if (strRegisters) {
      strRegisters = Array.isArray(strRegisters) ? strRegisters : [strRegisters];
      regs = strRegisters.map(reg => JSON.parse(reg));
    } else ({ string: strRegisters, json: regs } = await Find(key, where));
    if (strRegisters.length === 0) return resolve(0);

    redis.srem(key, ...strRegisters, async (error, deleted) => {
      if (error) throw error;
      if (deleted === 0) return resolve(0);
      const keys = Object.keys(update);
      for (let k = 0; k < regs.length; k += 1)
        for (let m = 0; m < keys.length; m += 1) regs[k][keys[m]] = update[keys[m]];
      resolve(await Add(key, regs));
    });
  });

export { redis as client };
