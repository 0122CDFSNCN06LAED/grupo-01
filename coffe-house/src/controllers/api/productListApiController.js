const db = require("../../database/models");

module.exports = {
  productsList: (req, res) => {
    const page = Number(req.query.page) || 0;
    const pageSize = req.query.pageSize ?? 10;

    db.Products.findAndCountAll({
      include: [{ all: true }],
     /*  limit: pageSize,
      offset: page * pageSize, */


    }).then(({ count, rows }) => {
              
      rows = rows.map((product, i) => {
        product = {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            image: `http://localhost:3002/img/products/${product.image}`,
            region: product.region,
            category: product.productCategory.type,
            stock: product.stock
           
    }
     return product  
    })

      let respuesta = {
        meta: {
          status: 200,
          total: count,
          url: req.originalUrl,
          prevPage: page > 0,
          nextPage: (page + 1) * pageSize < count,
        },
        data: rows,
      };

      res.json(respuesta);
    });
  },
};
