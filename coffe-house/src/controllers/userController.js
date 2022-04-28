const path = require ("path")
const fs = require("fs");
const usersFilePath = path.join(__dirname, "../data/usersDataBase.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const userController = {
    login: (req, res) => {
        /* res.sendFile(path.join(__dirname, '../views/login.html')) */
        res.render('user/login', {style: 'login.css', title: 'Login'});
    },
    register: (req, res) => {
        /*  res.sendFile(path.join(__dirname, 'register.html')) */

        res.render('user/register', {style: 'register.css', title: 'Register'});
    
        const lastIndex = users.length - 1;
        const lastUser = users[lastIndex];
        const biggestId = lastUser ? lastUser.id : 0;
        const newId = biggestId + 1;
        
        const user = {
              id: newId,
              name: req.body.name,
              lastname: req.body.lastname,
              email: req.body.email,
              usuario: req.body.usuario,
              pasword: req.body.password
              
            };

        users.push(user);


        const jsonTxt = JSON.stringify(users, null, 2);
        fs.writeFileSync(usersFilePath, jsonTxt, "utf-8");

        res.redirect("/user/login" + newId);
         
    }
     
     
     
}

module.exports = userController;
