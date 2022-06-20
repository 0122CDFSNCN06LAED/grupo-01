
const db = require("../database/models");

const { Op } = require("sequelize");


const Products = db.Products;
const GrindsProducts = db.GrindsProducts;
const WeightProducts = db.WeightProducts;
const Grind = db.Grinds;
const Weight = db.Weight;
const ProductCategory = db.ProductCategories;



const productSequelizeController = {
  list: async (req, res) => {
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

    res.render("products/products-index", {
      blonde: blonde,
      medium: medium,
      dark: dark,
    });
  },

  create: async (req, res) => {
    try {
      const [weight, grinds, productCategory] = await Promise.all([
        Weight.findAll(),
        Grind.findAll(),
        ProductCategory.findAll(),
      ]);
      res.render("products/product-create", {
        weight: weight,
        grinds: grinds,
        productCategory: productCategory,
      });
    } catch (err) {
      console.log(err);
      res.render('products/product-error' );
    }
  },

  store: async (req, res) => {
    try {
      const newProduct = await Products.create({
        name: req.body.name,
        region: req.body.region,
        description: req.body.description,
        image: req.file.filename,
        price: req.body.price,
        stock: req.body.stock,
        category_id: req.body.category,
      });

      const grinds = req.body.grind;
      if (grinds.length > 1) {
        grinds.forEach((grind) => {
          GrindsProducts.create({
            id_grind: grind,
            id_product: newProduct.id,
          });
        });
      } else {
        GrindsProducts.create({
          id_grind: req.body.grind,
          id_product: newProduct.id,
        });
      }

      const weight = req.body.weight;
      if (weight.length > 1) {
        weight.forEach((weightid) => {
          WeightProducts.create({
            id_weight: weightid,
            id_product: newProduct.id,
          });
        });
      } else {
        WeightProducts.create({
          id_weight: req.body.weight,
          id_product: newProduct.id,
        });
      }

      res.redirect("/product");
    } catch (err) {
      console.log(err);
      res.render('products/product-error');
    }
  },

  product: async (req, res) => {
    
      try {
        const product = await Products.findByPk(req.params.id,
          { include: [
            {all: true}]
          });

        res.render("products/product-detail", {
          product
        });
      } catch (err) {
        console.error(err);
        res.render("products/product-error");
      }
    
  },
  edit: (req, res) => {
    const product_id = req.params.id;

    const product = Products.findByPk(product_id, {
      include: [{ all: true }],
    }).then((product) => {
      //INPUT CHECK GRANOS PARA PRODUCT-EDIT-SEQ.EJS
      const callBackGrind = (valor) => {
        for (const element of product.grind) {
          if (element === valor) return "checked";
        }
      };

      //INPUT CHECK GRANOS  Object Mode PARA PRODUCT-EDIT-SEQ.EJS
      const callBackObjetoGranos = (valor) => {
        if (product.grind === valor) return "checked";
      };

      //INPUT CHECK PARA PESO PRODUCT-EDIT-SEQ.EJS
      const callBackWeight = (valor) => {
        for (const element of product.weight) {
          if (element === valor) return "checked";
        }
      };
      //INPUT CHECK PARA PESO Object Mode PRODUCT-EDIT-SEQ.EJS
      const callBackObjetoWeight = (valor) => {
        if (product.weight === valor) return "checked";
      };

      res.render("products/product-edit-seq", {
        product,
        callBackGrind,
        callBackObjetoGranos,
        callBackWeight,
        callBackObjetoWeight,
      });
    });
  },
  update: (req, res)=>{
    const product_id = req.params.id;
    const file = req.file;

    Products.update({
      ...req.body,
      
  },
  {
    where:{
        id: product_id,
    }})
    .then(()=>{
      res.redirect('/product/detail/' + product_id)
    })
  
  },
  
  delete: async (req, res) => {
    let id = req.params.id;
    const product = await Products.findByPk(id, { include: [{ all: true }] });

    return res.render("products/product-delete", { product });
  },
  destroy: async (req, res) => {
    try{
    let id = req.params.id;
    const product = await Products.destroy({ where: { id: id }, force: true }) // force: true es para asegurar que se ejecute la acción
    
        return res.redirect("/");
    
  } catch (err) {
    console.error(err);
    res.render("products/product-error");
  }
},
  error: (req,res)=>{
    
    res.render('products/product-error' );
  }
};

module.exports = productSequelizeController
