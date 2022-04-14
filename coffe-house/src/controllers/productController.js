const path = require ("path")

const productController = {
    product: (req, res) => {
        /*  res.sendFile(path.join(__dirname, '../views/product-detail.html'));  */
        res.render('products/product-detail', {style: 'product-detail.css', title: 'Product'});
    },
    create: (req, res) => {
        res.render('products/product-create', {style: 'product-create.css', title: 'Create product'});
    },
    edit: (req, res) => {
        res.render('products/product-edit', {style: 'product-create.css', title: 'Edit product'});
    },
    cart: (req, res) => {
        /* res.sendFile(path.join(__dirname, 'cart.html')) */
        res.render('products/cart', {style: 'cart.css', title: 'Cart'});
    }
}

module.exports = productController;
