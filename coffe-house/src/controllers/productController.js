const path = require ("path")

const productController = {
    product: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/product-detail.html'))
    }
}

module.exports = productController;
