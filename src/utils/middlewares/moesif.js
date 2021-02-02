import moesif from 'moesif-nodejs';

const moesifMiddleware = moesif({
  applicationId: process.env.MOESIF_APP_ID
});

moesifMiddleware.startCaptureOutgoing();

export default moesifMiddleware;
