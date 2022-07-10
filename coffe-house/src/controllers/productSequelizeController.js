const {validationResult, body} = require('express-validator');
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
    let erroresValidacion = validationResult(req);
    const [weight, grinds, productCategory] = await Promise.all([
      Weight.findAll(),
      Grind.findAll(),
      ProductCategory.findAll(),
    ]);
    
    if(!erroresValidacion.isEmpty()){
      
    
      return res.render("products/product-create",{ errors:erroresValidacion.mapped(),
                                                    weight: weight,
                                                    grinds: grinds,
                                                    productCategory: productCategory,
                                                    oldData:req.body})
    }
    else{
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
  
        res.redirect("/product/detail/" + newProduct.id);
      } catch (err) {
        console.log(err);
        res.render('products/product-error');
      }
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
  edit: async(req, res) => {
    
    const id = req.params.id;

   const [product, dbweights, dbgrinds, productCategory] = await Promise.all([
     Products.findByPk(id, { include: [{ all: true }] }),
     Weight.findAll(),
     Grind.findAll(),
     ProductCategory.findAll(),
   ]);
   const grindsOfThisProduct = product.grinds;
   const weightOfThisProduct = product.weight; 

   res.render("products/product-edit-seq", {
     product,
     grindsOfThisProduct,
     weightOfThisProduct,
     dbweights,
     dbgrinds,
     productCategory,
   }); 
},
update: async (req, res)=>{
   
   try {
    const oldProduct =await Products.findByPk(req.params.id);
       const editProduct = await Products.update({
         name: req.body.name,
         region: req.body.region,
         description: req.body.description,
         image: req.file ? req.file.filename : oldProduct.image,
         price: req.body.price,
         stock: req.body.stock,
         category_id: req.body.category,
       },{
           where: {id: oldProduct.id}
       })

        const oldGrinds = await GrindsProducts.destroy({
          where: {
            id_product: oldProduct.id,
        }
        });
        
        const newGrinds = req.body.grind;
      if (newGrinds.length > 1) {
        newGrinds.forEach((grind) => {
          GrindsProducts.create({
            id_grind: grind,
            id_product: oldProduct.id,
          });
        });
      } else {
        GrindsProducts.create({
          id_grind: req.body.grind,
          id_product: oldProduct.id,
        });
      }
      
      const oldWeights = await WeightProducts.destroy({
        where: {
          id_product: oldProduct.id,
      }
      });
       const newWeights = req.body.weight;
       if (newWeights.length > 1) {
         newWeights.forEach((weight) => {
          WeightProducts.create({
            id_weight: weight,
            id_product: oldProduct.id,
          })
            
         });
       } else {
        WeightProducts.create({
          id_weight: newWeights,
          id_product: oldProduct.id,
        })
       }
       
 
       
 
       res.redirect("/product/detail/" + oldProduct.id);
     } catch (err) {
       console.log(err);
       res.render('products/product-error');
     }
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
    
        return res.redirect("/product");
    
  } catch (err) {
    console.error(err);
    res.render("products/product-error");
  }
},
search: async (req, res) => {
  await Products.findAll({
    where: { 
      [Op.or]: {
        name: {
          [Op.like]: '%' + req.query.search + '%' },
      description: {
        [Op.like]: '%' + req.query.search + '%' },
      region: {
          [Op.like]: '%' + req.query.search + '%' },
       
      }
         
    }
})
.then(function(products) {
res.render("products/search", {products:products})
})
},
  error: (req,res)=>{
    
    res.render('products/product-error' );
  }
};

module.exports = productSequelizeController
