const { body } = require ('express-validator');
const validateRegister = [
    body('name').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('lastname').notEmpty().withMessage('Tienes que escribir un apellido'),
    body('username').notEmpty().withMessage('Tienes que escribir un nombre de usuario'),
    body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
        body('password').notEmpty().withMessage('Tienes que escribir una contraseña').bail()
                        .isLength({min:6}),
       
];

module.exports=validateRegister