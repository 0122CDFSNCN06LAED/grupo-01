const { body } = require("express-validator");
const path = require('path');

const validateProductEdit = [
  body("name")
    .notEmpty()
    .withMessage("Tienes que escribir un nombre para el producto con al menos 6 caracteres"),
  body("region")
    .notEmpty()
    .withMessage("Tienes que escribir la región de origen"),
  body("description")
    .notEmpty()
    .withMessage("Tienes que escribir una descripcion con al menos 16 caracteres"),    
  body("weight")
  .notEmpty()
  .withMessage("Tienes que especificar el peso neto del producto"),
  body("price")
  .notEmpty()
  .withMessage("Tienes que especificar el valor del producto en $ argentinos"),
  body("image").custom((value, {req})=>{
    let file = req.file;
    let extencionesAceptadas = ['.jpg', '.png', '.gif'];
    
    if(!file){
      throw new Error('Tienes subir una imagen');
    } else{
      let fileExtension = path.extname(file.originalname);
      if(!extencionesAceptadas.includes(fileExtension)){
        throw new Error(`Las extensiones de archivo permitidas son ${extencionesAceptadas.join(', ')}`);
      }
      
    }
    return true;
  })
];

module.exports = validateProductEdit;