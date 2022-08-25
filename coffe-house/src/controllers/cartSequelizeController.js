const db = require("../database/models");

module.exports = {
  cart: async (req, res) => {
    let prodId = 0;
    const quantity = req.query.quantity || 1;
    const productsAddCart = req.session.productsCart;

    //Producto no repetido.
    if (productsAddCart) {
      const nonRepeatedProduct = await productsAddCart.filter((item) => {
        if (prodId !== item.id) {
          prodId = item.id;
          return item;
        }
      });

      //Producto con su corespondiente propiedad quantity.
      const products = await nonRepeatedProduct
        .map((item, i, cb) => {
          cb = quantity;
          if (Array.isArray(cb)) {
            return { ...item, quantity: cb[i] };
          }
          return { ...item, quantity: cb };
        })
        //Filtrado (cantidad mayor a cero). Remueve el producto del carrito si es cero.
        .filter((item) => item.quantity > 0);

      req.session.productsCart = products;

      if (products == "") {
        return res.redirect("/product");
      } else {
        return res.render("products/cart", {
          productsAddCart: products,
        });
      }
    }
    return res.redirect("/product");
  },
  cartAdd: (req, res) => {
    const id = req.params.id;

    const productOfBd = db.Products.findByPk(id)
      .then(function (product) {
        if (req.session.productsCart) {
          const productsAdd = req.session.productsCart.find(
            (prod) => prod.id == product.id
          );
          if (productsAdd) {
            return res.redirect("/cart");
          }
          req.session.productsCart.push(product);
        } else {
          req.session.productsCart = [];
          req.session.productsCart.push(product);
        }

        res.redirect("/cart");
      })
      .catch((err) => {
        console.log(err);
        res.render("products/product-error");
      });
  },
};
