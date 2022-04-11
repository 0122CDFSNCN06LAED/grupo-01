const express = require("express");
const app = express();
const path = require("path");
const rutaHome = require ('./routes/home');
const rutaLogin = require ('./routes/login');   
const rutaRegister = require('./routes/register');
const rutaProduct = require('./routes/product');
const rutaCart = require('./routes/cart');

 
app.set('view engine', 'ejs'); 
app.set("views", path.resolve(__dirname, "./views"));

//le damos acceso a carpeta public
app.use(express.static(path.join(__dirname, "../public")));
//Levantar el servidor
app.listen(3000, () => {
  console.log("servidor corriendo http://localhost:3000/");
}); //el link me permite acceder rápidamente desde la terminal

//RUTAS NUEVAS
app.use(rutaHome);
app.use(rutaLogin);
app.use(rutaRegister);
app.use(rutaProduct);
app.use(rutaCart);



