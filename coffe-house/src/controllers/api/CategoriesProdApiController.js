const db = require("../../database/models");

module.exports = {
  ProductCategories: (req, res) => {
    db.ProductCategories.findAndCountAll({
      include: [{ all: true }]}
    ).then(({ count, rows }) => {
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
