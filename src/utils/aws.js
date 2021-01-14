import Aws from 'aws-sdk';

export const ses = new Aws.SES({
  accessKeyId: process.env.SES_ACCESS_KEY,
  secretAccessKey: process.env.SES_SECRET_KEY,
  region: process.env.SES_REGION
});

export const sns = new Aws.SNS({
  accessKeyId: process.env.SNS_ACCESS_KEY,
  secretAccessKey: process.env.SNS_SECRET_KEY,
  region: process.env.SNS_REGION
});
