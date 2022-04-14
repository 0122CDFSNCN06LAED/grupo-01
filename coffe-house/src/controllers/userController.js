const path = require ("path")

const userController = {
    login: (req, res) => {
        /* res.sendFile(path.join(__dirname, '../views/login.html')) */
        res.render('user/login', {style: 'login.css', title: 'Login'});
    },
    register: (req, res) => {
        /*  res.sendFile(path.join(__dirname, 'register.html')) */
         res.render('user/register', {style: 'register.css', title: 'Register'});
     }
}

module.exports = userController;