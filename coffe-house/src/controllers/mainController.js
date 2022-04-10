const path = require ("path")

const mainController = {
    home: (req, res) => {
        res.render("../views/home.ejs", {style: 'home.css', title: 'Home'});
    },
}


    module.exports= mainController