// const mercadopago = require('mercadopago');

// const env = require('../../commons/env');
// const { product, user, payment } = require('../../database/models');
// const rollbar = require('../../commons/rollbar');
// const { axios } = require('../../commons/request');
// const { largeID } = require('../../commons/passwords');

// const baseUrl = env.NGROK_URL || `${env.URL_PREFIX}${env.DOMAIN_NAME}`;
// const notification_url = `${baseUrl}/api/mercadopago/notification`;

// mercadopago.configure({ access_token: env.MERCADO_PAGO_TOKEN });

module.exports = {
  createPayment: async (req, res) => {
    const { type, product_id, monthly_payment_code, reference } = req.body;
    let search;
    if (type === 'unique') search = { _id: product_id };
    else if (type === 'monthly') search = { 'MonthlyPrice.PaymentCode': monthly_payment_code };
    let Product = await product.get(search);
    if (!Product) {
      rollbar.error(`Error searching product: '${product_id}'`);
      return res.status(500).json({ error: 'Error searching product' });
    }
    [Product] = Product;
    if (!Product) {
      rollbar.warn(`Product not found: '${product_id}'`);
      return res.status(404).json({ error: 'Product not found' });
    }
    const { UniquePrice, MonthlyPrice, Description } = Product;
    const paymentVerificationCode = largeID(2);
    const preference = {
      external_reference: reference,
      notification_url,
      items: [
        {
          title: Product.Name,
          currency_id: UniquePrice.CurrencyID,
          description: Description,
          category_id: 'virtual_goods',
          unit_price: UniquePrice.Value,
          quantity: 1
        }
      ],
      back_urls: {
        success: `${baseUrl}/after_payment?status=success&payment_verification_code=${paymentVerificationCode}`,
        failure: `${baseUrl}/after_payment?status=failure&payment_verification_code=${paymentVerificationCode}`,
        pending: `${baseUrl}/after_payment?status=pending&payment_verification_code=${paymentVerificationCode}`
      }
    };
    mercadopago.preferences
      .create(preference)
      .then(async ({ body }) => {
        req.session.paymentVerificationCode = paymentVerificationCode;
        res.status(200).json(body);
        payment.save({ ProductID: Product.ID, Reference: reference, Active: false });
        if (type === 'monthly' && !req.session.user) {
          const User = await user.get({ _id: Product.OwnerID });
          if (!User || !User.length) return;
          [req.session.user] = User;
        }
      })
      .catch(error => {
        rollbar.error(error);
        res.status(404).json({ message: 'Could not create the payment', error });
      });
  },
  notification: async (req, res) => {
    console.log('Body', JSON.stringify(req.body, null, 2));
    res.status(200).send('OK');
    const { action, data } = req.body;
    if (action !== 'payment.created') return;
    const { id } = data;

    const response = await axios({
      options: {
        url: env.MERCADO_PAGO_PAYMENT,
        method: 'get',
        params: { access_token: env.MERCADO_PAGO_TOKEN, id }
      },
      persist: true
    });
    if (!response) return;
    if (response.status !== 200)
      return rollbar.critical(`Could not get external ID\nPayment: ${JSON.stringify(req.body, null, 2)}`);
    if (!response.body.results.length)
      return rollbar.critical(`Payment not found\nPayment: ${JSON.stringify(req.body, null, 2)}`);
    const [{ external_reference }] = response.body.results;

    const updated = await payment.update({ Reference: external_reference }, { ID: id, Active: true });
    if (updated === 0) rollbar.error(`Payment not found, reference: ${external_reference}`);
  }
};
