import { sns } from './aws';
import rollbar from './rollbar';

export const send = (phone, text) =>
  new Promise(resolve => {
    sns.publish(
      {
        Message: text,
        PhoneNumber: phone
      },
      (error, data) => {
        if (error) throw new Error(error, { phone, text });
        resolve(data);
      }
    );
  });
