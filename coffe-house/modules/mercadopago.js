const mercadoPago = require("mercadopago");

const credential =
  process.env.MP ||
  "TEST-999274200645149-082417-c23560a001d93970fce0597e1adc77b3-46233867"; //Ruben

let server = process.env.SERVER || "http://localhost:3002";
const feedback = `${server}/checkout/feedback`;

const mp = async (items, cuotes, shipping) => {
  try {
    mercadoPago.configure({
      access_token: credential,
    });
    let config = {
      items: items,
      back_urls: {
        success: feedback,
        failure: feedback,
        pending: feedback,
      },
      payment_methods: {
        installments: cuotes,
      },
      auto_return: "approved",
      shipments: {
        cost: shipping,
        mode: "not_specified",
      },
    };
    let preference = await mercadoPago.preferences.create(config);
    return preference;
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = mp;
