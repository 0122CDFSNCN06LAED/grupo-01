const path = require ("path")

const mainController = {
    home: (req, res) => {
        res.render("home", {style: 'home.css', title: 'Home'});
    },
}


    module.exports= mainController