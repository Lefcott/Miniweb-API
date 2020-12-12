import mustache from 'mustache';

import fs from 'fs';

import rollbar from '../rollbar';
import env from '../../env.json';
import projectDir from '../projectDir';
import { ses } from '../aws';

import * as constants from './constants';

const templates = {};
mustache.escape = text => text;

fs.readdir(`${projectDir}/src/emails`, (error, dirs) => {
  if (error) throw error;
  for (let i = 0; i < dirs.length; i += 1) {
    const name = dirs[i];
    templates[name] = {
      spec: require(`${projectDir}/src/emails/${name}/spec.json`),
      lang: require(`${projectDir}/src/emails/${name}/lang.json`),
      html: fs.readFileSync(`${projectDir}/src/emails/${name}/html.html`).toString(),
      text: fs.readFileSync(`${projectDir}/src/emails/${name}/text.txt`).toString()
    };
  }
});

export const sendEmail = (from, to, subject, text, html) =>
  new Promise(async resolve => {
    from = constants.EMAIL_FROM[from];
    if (!from) throw new Error(`From ${from} not found`);
    if (!to || !to.length) throw new Error(`No recipients found for sending email, subject: ${subject}`);

    to = Array.isArray(to) ? to : [to];
    ses.sendEmail(
      {
        Destination: { ToAddresses: to },
        Message: {
          Body: { Html: { Charset: 'UTF-8', Data: html }, Text: { Charset: 'UTF-8', Data: text } },
          Subject: { Charset: 'UTF-8', Data: subject }
        },
        Source: from
      },
      (error, data) => {
        if (error) throw error;
        rollbar.info(`sent '${subject}' email from ${from} to ${to}`);
        resolve(data);
      }
    );
  });

export const getEmailFromTemplate = (name, language_code, data) => {
  const template = templates[name];
  if (!template) throw new Error(`Unexistent template with name ${name}`);
  const language = template.lang[language_code];
  if (!language) throw new Error(`Unexistent language with code ${language_code}`);
  if (!language.subject) throw new Error(`Didn't find subject for language ${language_code}`);

  return {
    subject: language.subject,
    html: mustache.render(template.html, { data, language }) || '',
    text: mustache.render(template.text, { data, language }) || ''
  };
};

export { templates };
