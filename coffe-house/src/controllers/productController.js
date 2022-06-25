const path = require("path");
const fs = require("fs");
const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const productController = {
  listar: (req, res) => {
    const blonde = products.filter((p) => p.category == "blonde");
    const medium = products.filter((p) => p.category == "medium");
    const dark = products.filter((p) => p.category == "dark");
    res.render("products/products-index", {
      blonde: blonde,
      medium: medium,
      dark: dark,
    });
  },

  product: (req, res) => {
    const id = req.params.id;
    const product = products.find((p) => id == p.id);

    res.render("products/product-detail", {
      product: product,
    });
  },

  create: (req, res) => {
    res.render("products/product-create");
  },
  store: (req, res) => {
    const lastIndex = products.length - 1;
    const lastProduct = products[lastIndex];
    const biggestId = lastProduct ? lastProduct.id : 0;
    const newId = biggestId + 1;

    const product = {
      id: newId,
      name: req.body.name,
      category: req.body.category,
      region: req.body.region,
      description: req.body.description,
      grind: req.body.grind,
      weight: req.body.weight,
      image: req.file.filename,
      price: req.body.price,
    };

    products.push(product);

    const jsonTxt = JSON.stringify(products, null, 2);
    fs.writeFileSync(productsFilePath, jsonTxt, "utf-8");

    res.redirect("/product/detail/" + newId);
  },
  edit: (req, res) => {
    const id = req.params.id;

    const product = products.find((p) => id == p.id);

    //CALLBACK DE ARRAY USADO EN PRODUCT-EDIT.EJS, INPUT CHECK GRANOS.
    const cb = (valor) => {
      for (const element of product.grind) {
        if (element === valor) return "checked";
      }
    };

    //CALLBACK DE OBJETO LITERAL USADO EN PRODUCT-EDIT.EJS INPUT CHECK GRANOS.
    const cbObj = (valor) => {
      if (product.grind === valor) return "checked";
    };

    //CALLBACK DE ARRAY USADO EN PRODUCT-EDIT.EJS INPUT CHECK PESO.
    const cbW = (valor) => {
      for (const element of product.weight) {
        if (element === valor) return "checked";
      }
    };

    //CALLBACK DE OBJETO LITERAL USADO EN PRODUCT-EDIT.EJS INPUT CHECK PESO.
    const cbOW = (valor) => {
      if (product.weight === valor) return "checked";
    };

    res.render("products/product-edit", {
      
      product,
      cb,
      cbObj,
      cbW,
      cbOW,
    });
    /*  res.render('products/product-edit', {style: 'product-create.css', title: 'Edit product'}); */
  },
  update2: (req, res) => {
    const id = req.params.id;
    const file = req.file;

    const product = products.find((p) => id == p.id);

    //ALAMACENO LOS DATOS EN CASO DE SER MODIFICADOS Y SINO NO MODIFICA LOS DATOS.
    const prodModif = {
      ...product,
      ...req.body,
      image: file === undefined ? product.image : file.filename,
    };

    //BUSCO EL INDICE DEL PRODUCTO EN PRODUCTS QUE VIENE DE JSON.
    const indexProd = products.findIndex((prod) => prod.id == id);

    //REEMPLAZO LOS DATOS DE ESE INDICE POR LOS MODIFICADOS EN CASO DE SER ASI.
    const insetProduct = products.splice(indexProd, 1, prodModif);

    //GUARDO LOS DATOS EN JSON.
    const jsonTxt = JSON.stringify(products, null, 2);
    const productEdit = fs.writeFileSync(productsFilePath, jsonTxt, "utf-8");

    res.redirect("/product/detail/" + id);
  },
  destroy: (req, res) => {
    const id = req.params.id;

    //BUSCO EL INDICE DEL PRODUCTO EN PRODUCTS QUE VIENE DE JSON.
    const indexProd = products.findIndex((prod) => prod.id == id);

    //REEMPLAZO LOS DATOS DE ESE INDICE POR LOS MODIFICADOS EN CASO DE SER ASI.
    const insetProduct = products.splice(indexProd, 1);

    //GUARDO LOS DATOS EN JSON.
    const jsonTxt = JSON.stringify(products, null, 2);
    const productEdit = fs.writeFileSync(productsFilePath, jsonTxt, "utf-8");

    res.redirect("/product");
  },
  cart: (req, res) => {
    /* res.sendFile(path.join(__dirname, 'cart.html')) */
    res.render("products/cart", { style: "cart.css", title: "Cart" });
  },
};

module.exports = productController;
