import { uuid } from 'uuidv4';
import bcrypt from 'bcryptjs';

export const encrypt = pass =>
  new Promise(resolve => bcrypt.hash(pass, 6, (err, hash) => resolve(err ? null : hash)));

export const largeID = n => {
  let result = '';
  for (let i = 0; i < n; i += 1) result += uuid().toUpperCase();
  return result.replace(/-/g, 'V');
};

export const randomCode = digits => {
  let code = '';
  for (let i = 0; i < digits; i += 1) {
    const rand = Math.floor(Math.random() * 10);
    code += String.fromCharCode(rand + 48);
  }
  return code;
};

export const { compareSync: compare } = bcrypt;
