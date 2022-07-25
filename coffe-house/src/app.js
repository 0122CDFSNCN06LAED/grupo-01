const express = require("express");
const app = express();
const path = require("path");
const rutaHome = require("./routes/home");
const rutaUser = require("./routes/user");
const rutaProduct = require("./routes/product");
const methodOverride = require("method-override");
const session = require("express-session");
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");
const cookies = require("cookie-parser");
const adminMiddleware = require("./middlewares/adminMiddleware");
const userListApiRouter = require("./routes/api/UserListApiRouter");
const productsApiRouter = require("./routes/api/ProductsApiRouter");

app.use(
  session({
    secret: "Shh, it's a secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookies());
app.use(userLoggedMiddleware);
app.use(adminMiddleware);
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

//le damos acceso a carpeta public
app.use(express.static(path.join(__dirname, "../public")));

//Levantar el servidor
app.listen(3000, () => {
  console.log("servidor corriendo http://localhost:3000/");
}); //el link me permite acceder rápidamente desde la terminal
//RUTAS NUEVAS
app.use(rutaHome);
app.use(rutaUser);
app.use("/api", userListApiRouter);

app.use(rutaProduct);
