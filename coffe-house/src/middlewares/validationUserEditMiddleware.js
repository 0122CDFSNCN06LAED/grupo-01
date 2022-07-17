const { body } = require("express-validator");

const validateUserEditRegister = [
  body("name")
    .notEmpty()
    .withMessage("Tienes que escribir un nombre")
    .isLength({ min: 2 })
    .withMessage("Debes escribir un nombre con al menos 2 caracteres"),
  body("lastname")
    .notEmpty()
    .withMessage("Tienes que escribir un apellido")
    .isLength({ min: 2 })
    .withMessage("Debes escribir un apellido con al menos 2 caracteres"),
  body("username")
    .notEmpty()
    .withMessage("Tienes que escribir un nombre de usuario")
    .isLength({ min: 2 })
    .withMessage("Debes escribir un usuario con al menos 2 caracteres"),
  body("email")
    .notEmpty()
    .withMessage("Tienes que escribir un correo electrónico")
    .bail()
    .isEmail()
    .withMessage("Debes escribir un formato de correo válido"),
  body("password")
    .notEmpty()
    .withMessage("Tienes que escribir una contraseña")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Debes escribir una contraseña con al menos 8 caracteres"),
];

module.exports = validateUserEditRegister;