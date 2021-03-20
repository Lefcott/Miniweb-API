import mustache from 'mustache';

import fs from 'fs';

import rollbar from '../rollbar';
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
      lang: require(`${projectDir}/src/emails/${name}/lang.json`),
      html: fs.readFileSync(`${projectDir}/src/emails/${name}/html.html`).toString(),
      text: fs.readFileSync(`${projectDir}/src/emails/${name}/text.txt`).toString()
    };
  }
});

export const send_email = (from, to, subject, text, html, data) =>
  new Promise(resolve => {
    from = constants.EMAIL_FROM[from];
    if (!from) throw new Error(`From ${from} not found`, '', { subject, to, data });
    if (!to || !to.length)
      throw new Error(`No recipients found for sending email`, '', { from, subject, data });

    to = (Array.isArray(to) ? to : [to]).slice(0, 40);

    ses.sendEmail(
      {
        Destination: { ToAddresses: to },
        Message: {
          Body: { Html: { Charset: 'UTF-8', Data: html }, Text: { Charset: 'UTF-8', Data: text } },
          Subject: { Charset: 'UTF-8', Data: subject }
        },
        Source: from
      },
      (error, response) => {
        if (error) throw error;
        rollbar.info(
          `sent '${subject}' email from ${from} to ${to}\n Data:\n${JSON.stringify(data, null, 2)}`
        );
        resolve(response);
      }
    );
  });

export const get_email_from_template = (name, language_code, data) => {
  const template = templates[name];
  if (!template) throw new Error(`Unexistent template with name ${name}`, '', { language_code, data });
  const language = template.lang[language_code];
  if (!language)
    throw new Error(`Unexistent language with code ${language_code}`, '', { template_name: name, data });
  if (!language.subject)
    throw new Error(`Didn't find subject for language ${language_code}`, '', { template_name: name, data });

  return {
    subject: language.subject,
    html: mustache.render(template.html, { data, language }) || '',
    text: mustache.render(template.text, { data, language }) || ''
  };
};

export { templates };
