const db = require("../database/models");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

module.exports = {
  login: (req, res) => {
    return res.render("user/login");
  },
  loginProcess: async (req, res) => {
    const userToLogin = await db.Users.findAll({
      where: { email: req.body.email },
    });

    if (!(userToLogin == "")) {
      const isOkThePassword = bcryptjs.compareSync(
        req.body.password,
        userToLogin[0].password
      );
      if (isOkThePassword) {
        delete userToLogin[0].password;
        //guarda los datos del usuario en session.userLogged
        req.session.userLogged = userToLogin[0];

        if (req.body.remember_user) {
          res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 });
        }

        return res.redirect("profile");
      }

      return res.render("user/login", {
        errors: {
          email: {
            msg: "Las credenciales son inválidas",
          },
        },
      });
    }
    return res.render("user/login", {
      errors: {
        email: {
          msg: "No existe este mail en nuestra base de datos",
        },
      },
    });
  },
  register: (req, res) => {
    res.render("user/register");
  },
  userCreate: async (req, res) => {
    const resultValidation = validationResult(req);
    const body = req.body;

    if (resultValidation.errors.length > 0) {
      res.render("user/register", {
        errors: resultValidation.mapped(),
        oldData: body,
      });
    } else {
      //para evitar que un usuario se vuelva a registrar con el mismo mail
      let userInDB = await db.Users.findAll({
        where: { email: body.email },
      });
      //si el mail ya existe le devuelvo un error
      if (!(userInDB == "")) {
        return res.render("user/register", {
          errors: {
            email: {
              msg: "Este email ya está registrado",
            },
          },
          oldData: body,
        });
      }

      //Si el password no coincide con la confirmación muestro el error.
      if (body.password !== body.password2) {
        return res.render("user/register", {
          errors: {
            password2: {
              msg: "Las credenciales no son válidas",
            },
          },
          oldData: body,
        });
      }

      delete body.password2;

      const passwordBcrypt = bcryptjs.hashSync(req.body.password, 10);
      const image = req.file ? req.file.filename : "default.png";
      const emailAdmin = body.email.includes("@coffeehouse.com");

      const userToCreate = {
        ...body,
        password: passwordBcrypt,
        avatar: image,
        user_category_id: emailAdmin ? 1 : 2, //user admin  o  user client
      };

      let userCreated = db.Users.create(userToCreate);

      return res.redirect("/user/login");
    }
  },
  profile: (req, res) => {
    res.render("user/profile", {
      user: req.session.userLogged,
      userUpdate: req.session.userUpdate,
    });
  },
  logout: (req, res) => {
    //elimina la cookie para no continuar logueado
    res.clearCookie("userEmail");
    //borra los datos que están en session
    req.session.destroy();
    return res.redirect("/");
  }, //al destruir la session el middleware de la ruta profile no me permite ingresar y me redirige.
  userDetail: async (req, res) => {
    const userLoggedSession = req.session.userLogged;

    const userLoggedOfDb = await db.Users.findAll({
      where: { id: userLoggedSession.id },
    });

    res.render("user/userDetail", {
      oldData: userLoggedOfDb[0],
    });
  },
  update: async (req, res) => {
    const dataUser = req.session.userLogged;
    const body = req.body;
    const userAdmin = "@coffeehouse.com";
    const errors = validationResult(req);

    if (errors.errors.length > 0) {
      return res.render("user/userDetail", {
        errors: errors.mapped(),
        oldData: dataUser,
      });
    }

    const passwordBcrypt = bcryptjs.hashSync(body.password, 10);
    const image = req.file ? req.file.filename : "default.png";
    const emailAdmin = body.email.includes(userAdmin);

    const userUpdate = {
      ...body,
      password: passwordBcrypt,
      avatar: image,
      user_category_id: emailAdmin ? 1 : 2, //user admin  o  user client
    };

    const userUpdatedOfDb = await db.Users.update(
      { ...userUpdate },
      { where: { id: req.params.id } }
    );

    delete userUpdate.password;
    delete userUpdate.user_category_id;

    req.session.userUpdate = userUpdate;

    res.redirect("/user/profile");
  },
  destroy: async (req, res) => {
    try {
      const idUserRegister = req.params.id;

      const deleteUser = await db.Users.destroy({
        where: {
          id: idUserRegister,
        },
      });
      req.session.destroy();
      res.redirect("/user/login");
    } catch (err) {
      console.log(err);
      res.render("products/product-error");
    }
  },
  userDeleteConfim: (req, res) => {
    res.render("user/userDeleteConfirm", {
      oldData: req.session.userLogged,
    });
  },
};
