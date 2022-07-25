const db = require("../../database/models");

module.exports = {
  ProductCategories: (req, res) => {
    db.ProductCategories.findAndCountAll().then(({ count, rows }) => {
      let respuesta = {
        meta: {
          status: 200,
          total: count,
          url: req.originalUrl,
        },
        data: rows,
      };

      res.json(respuesta);
    });
  },
};
