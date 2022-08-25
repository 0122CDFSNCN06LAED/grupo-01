const mp = require("../../modules/mercadopago");
const db = require("../database/models");

module.exports = {
  cartProcess: async (req, res) => {
    const productCart = req.session.productsCart;
    try {
      const stockOfModifiedProducts = await productCart.map((item) => {
        return db.Products.update(
          { ...item, stock: item.stock - item.quantity },
          { where: { id: item.id } }
        );
      });

      let items = productCart.map((item) =>
        Object({
          ...item,
          quantity: Number(item.quantity),
          category_id: `${item.category_id}`,
          currency_id: "ARS",
          unit_price: item.price,
        })
      );

      let link = await mp(items, 12, 0);

      return res.redirect(link.body.init_point);
    } catch (error) {
      return res.send(error);
    }
  },

  cartFeedback: async (req, res) => {
    const query = req.query;

    return res.redirect("/product");
  },
};
