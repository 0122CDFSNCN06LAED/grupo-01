const path = require ("path");
const db = require("../database/models");
const Products = db.Products;

const mainController = {
    home: async (req, res) => {
        const products = await Products.findAll({
            include: [
              {
                association: "productCategory",
              },
            ],
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
   
}


    module.exports= mainController