const express = require ("express");
const app = express();
const path = require ("path");

//le damos acceso a carpeta public
app.use(express.static(path.join(__dirname, "public")));
//Levantar el servidor
app.listen(3000, () => {
    console.log("servidor corriendo http://localhost:3000/")
});

//creamos las rutas
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "views/home.html"))
});
app.get("/product", (req,res) => {
    res.sendFile(path.join(__dirname, "views/product-detail.html"))
});
app.get("/login", (req,res) => {
    res.sendFile(path.join(__dirname, "views/login.html"))
});
app.get("/register", (req,res) => {
    res.sendFile(path.join(__dirname, "views/register.html"))
});
app.get("/cart", (req,res) => {
    res.sendFile(path.join(__dirname, "views/cart.html"))
});
