const path = require ("path");
const fs = require ("fs");
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json')
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productController = {
    listar: (req, res) => {
      const blonde= products.filter((p) => p.category == "blonde");
		const medium = products.filter((p) => p.category == "medium");
    const dark = products.filter((p) => p.category == "dark");
      res.render("products/products-index", {style: 'products-index.css', title: 'Create product', 
      blonde: blonde,
    medium:medium,
  dark:dark})
    },

    product: (req, res) => {
        const id = req.params.id;
		const product = products.find((p) => id == p.id);

		res.render("products/product-detail", {
			product: product})
       
    },

    create: (req, res) => {
        res.render('products/product-create', {style: 'product-create.css', title: 'Create product'});
    },
    store: (req,res) => {
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
	
		res.render('products/product-edit', {style: 'product-create.css', title: 'Edit product', product});
       /*  res.render('products/product-edit', {style: 'product-create.css', title: 'Edit product'}); */
    },
    update: (req, res) => {
		const id = req.params.id;
	
		const product = products.find((p) => id == p.id);
		
		Object.assign(product, {
		  ...req.body,
		  /* price: Number(req.body.price),
		  weight: Number(req.body.weight), */
		});
	
		const jsonTxt = JSON.stringify(products, null, 2);
		fs.writeFileSync(productsFilePath, jsonTxt, "utf-8");
	
		res.redirect("/products/detail/" + id);
	  },
    cart: (req, res) => {
        /* res.sendFile(path.join(__dirname, 'cart.html')) */
        res.render('products/cart', {style: 'cart.css', title: 'Cart'});
    }
}

module.exports = productController;
