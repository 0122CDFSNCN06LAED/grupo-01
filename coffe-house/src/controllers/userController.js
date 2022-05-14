const path = require ("path")
const fs = require("fs");
const usersFilePath = path.join(__dirname, "../data/usersDataBase.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
const User = require('../models/user')
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs')

const userController = {
    
    register: (req, res) => {
       

        res.render('user/register');
    
    },
    processRegister: (req,res) =>{
        const resultValidation = validationResult(req);
		
		if (resultValidation.errors.length > 0) {
			res.render('user/register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		} else {
            //para evitar que un usuario se vuelva a registrar con el mismo mail
        let userInDB = User.findByField('email', req.body.email);
        //si el mail ya existe le devuelvo un error
           if (userInDB) {
           return res.render('user/register', {
           errors: {
               email: {
               msg: 'Este email ya está registrado'
                    }
                   },
                oldData: req.body
                    });
           } 

       const imagen = req.file ? req.file.filename : "default.png"
       let userToCreate = {
           ...req.body,
           password: bcryptjs.hashSync(req.body.password, 10),
           avatar: imagen
       }

       let userCreated = User.create(userToCreate);
       return res.redirect('login')
        }

     
    },
    login: (req, res) => {
        return res.render('user/login');
     },
     
     loginProcess: (req, res) => {
        const userToLogin = User.findByField('email', req.body.email);
        
        if (userToLogin) {
            const isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if(isOkThePassword) {
                delete userToLogin.password;
            //guarda los datos del usuario en session.userLogged
            req.session.userLogged = userToLogin;
            if(req.body.remember_user) {
                res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60)})
            }
            
                return res.redirect('profile')
            }

            return res.render('user/login', {
                errors: {
                    email: {
                        msg: 'Las credenciales son inválidas'
                    }
                }
            }) 
        } 
        return res.render('user/login', {
            errors: {
                email: {
                    msg: 'No existe este mail en nuestra base de datos'
                }
            }
        });
        
      
    },
    profile: (req, res) => {
      
        return res.render('user/profile', {
            user: req.session.userLogged
        });
      },
      logout: (req, res) => {
        //elimina la cookie para no continuar logueado
        res.clearCookie('userEmail')
        //borra los datos que están en session
        req.session.destroy();
        return res.redirect('/');
    } //al destruir la session el middleware de la ruta profile no me permite ingresar y me redirige.
     
     
}

module.exports = userController;
