const path = require ("path")

const userController = {
    login: (req, res) => {
        /* res.sendFile(path.join(__dirname, '../views/login.html')) */
        res.render('../views/user/login.ejs', {style: 'login.css', title: 'Login'});
    },
    register: (req, res) => {
        /*  res.sendFile(path.join(__dirname, '../views/register.html')) */
         res.render('../views/user/register.ejs', {style: 'register.css', title: 'Register'});
     }
}

module.exports = userController;