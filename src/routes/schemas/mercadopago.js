// // const joi = require('@hapi/joi');

// // const { sessionMiddleware } = require('../../commons/middlewares');
// // require('../../commons/env');

// module.exports = {
//   createPayment: {
//     method: 'post',
//     paths: '/mercadopago/payment',
//     middlewares: sessionMiddleware,
//     domains: process.env.DOMAIN_NAME,
//     // errorMessage: 'Bad parameters',
//     body: joi.object().keys({
//       type: joi.string().valid('unique', 'monthly').required(),
//       product_id: joi.when('type', {
//         is: 'unique',
//         then: joi.string().required(),
//         otherwise: joi.string()
//       }),
//       monthly_payment_code: joi.when('type', {
//         is: 'monthly',
//         then: joi.string().required(),
//         otherwise: joi.string()
//       }),
//       reference: joi.string().required()
//     })
//   },
//   notification: {
//     method: 'post',
//     paths: '/mercadopago/notification',
//     errorMessage: 'Bad parameters',
//     options: { allowUnknown: true },
//     body: joi.object().keys({})
//   }
// };
