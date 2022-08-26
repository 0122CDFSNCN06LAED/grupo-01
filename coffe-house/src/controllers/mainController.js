const path = require("path");
const { Op } = require("sequelize");
const db = require("../database/models");
const Products = db.Products;

const mainController = {
  home: async (req, res) => {
    const emailUserLogged = req.session.emailUserLogged;

    const products = await Products.findAll({
      include: [
        {
          association: "productCategory",
        },
      ],
      where: emailUserLogged ? "" : { stock: { [Op.gt]: 0 } },
    });

    const blonde = products.filter((p) => p.productCategory.type == "Blonde");
    const medium = products.filter((p) => p.productCategory.type == "Medium");
    const dark = products.filter((p) => p.productCategory.type == "Dark");
    res.render("home", {
      blonde: blonde,
      medium: medium,
      dark: dark,
    });
  },
  nuestrosCafes: (req, res) => {
    res.render("nuestros-cafes");
  },
  contacto: (req, res) => {
    res.render("contacto");
  },
};

module.exports = mainController;
