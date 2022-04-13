const path = require ("path")

const productController = {
    product: (req, res) => {
        /*  res.sendFile(path.join(__dirname, '../views/product-detail.html'));  */
        res.render('../views/products/product-detail.ejs', {style: 'product-detail.css', title: 'Product'});
    },
    create: (req, res) => {
        res.render('../views/products/product-create.ejs', {style: 'product-create.css', title: 'Create product'});
    },
    edit: (req, res) => {
        res.render('../views/products/product-edit.ejs', {style: 'product-create.css', title: 'Edit product'});
    },
    cart: (req, res) => {
        /* res.sendFile(path.join(__dirname, '../views/cart.html')) */
        res.render('../views/products/cart.ejs', {style: 'cart.css', title: 'Cart'});
    }
}

module.exports = productController;
