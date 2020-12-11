import Aws from 'aws-sdk';

import env from '../env.json';

export const ses = new Aws.SES({
  accessKeyId: env.SES_ACCESS_KEY,
  secretAccessKey: env.SES_SECRET_KEY,
  region: env.SES_REGION
});

export const sns = new Aws.SNS({
  accessKeyId: env.SNS_ACCESS_KEY,
  secretAccessKey: env.SNS_SECRET_KEY,
  region: env.SNS_REGION
});
