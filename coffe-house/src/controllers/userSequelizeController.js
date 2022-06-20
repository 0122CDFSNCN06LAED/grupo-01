const db = require("../database/models");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

module.exports = {
  logProcess: async (req, res) => {
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
  userCreate: async (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      res.render("user/register", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    } else {
      //para evitar que un usuario se vuelva a registrar con el mismo mail
      let userInDB = await db.Users.findAll({
        where: { email: req.body.email },
      });
      //si el mail ya existe le devuelvo un error
      if (!(userInDB == "")) {
        return res.render("user/register", {
          errors: {
            email: {
              msg: "Este email ya está registrado",
            },
          },
          oldData: req.body,
        });
      }

      //Si el password no coincide con la confirmación muestro el error.
      if (req.body.password !== req.body.password2) {
        return res.render("user/register", {
          errors: {
            password2: {
              msg: "Las credenciales no son válidas",
            },
          },
          oldData: req.body,
        });
      }

      delete req.body.password2;

      const imagen = req.file ? req.file.filename : "default.png";

      let userCreate = {
        ...req.body,
        password: bcryptjs.hashSync(req.body.password, 10),
        avatar: imagen,
      };

      let userToCreate;

      if (req.body.email.includes("@coffeehouse.com")) {
        userToCreate = {
          ...userCreate,
          user_category_id: 1, //user admin
        };
      } else {
        userToCreate = {
          ...userCreate,
          user_category_id: 2, //user client
        };
      }

      let userCreated = db.Users.create(userToCreate);
      return res.redirect("login");
    }
  },
  userDetail: async (req, res) => {
    const body = req.body;
    const errors = validationResult(req);

    if (errors.errors.length > 0) {
      return res.render("user/userSearch", {
        errors: errors.mapped(),
        user: req.session.userLogged,
      });
    }

    const userDb = await db.Users.findAll({
      where: {
        username: body.searchusers,
      },
    });

    if (userDb == "") {
      res.locals.userNot = true;

      return res.render("user/userSearch", {
        errors: errors.mapped(),
        user: req.session.userLogged,
      });
    }

    const userOne = userDb.find((user) => {
      return user;
    });
    req.session.err = errors.mapped();
    req.session.oldData = userOne;
    res.redirect("/user/detail/");
  },
  update: async (req, res) => {
    const dataUser = req.session.oldData;
    const body = req.body;
    const userAdmin = "@coffeehouse.com";
    const errors = validationResult(req);

    if (errors.errors.length > 0) {
      return res.render("user/userDetail", {
        errors: errors.mapped(),
        oldData: dataUser,
      });
    }

    let userUpdate = {};

    if (body.email.endsWith(userAdmin)) {
      userUpdate = {
        ...body,
        password: bcryptjs.hashSync(body.password, 10),
        avatar: req.file ? req.file.filename : "default.png",
        user_category_id: 1, //user Admin
      };
    } else {
      userUpdate = {
        ...body,
        password: bcryptjs.hashSync(body.password, 10),
        avatar: req.file ? req.file.filename : "default.png",
        user_category_id: 2, //User client
      };
    }

    const userUpdated = await db.Users.update(
      { ...userUpdate },
      { where: { id: req.params.id } }
    );
    res.redirect("/user/search");
  },
  destroy: async (req, res) => {
    const idUserRegister = req.params.id;
    const deleteUser = await db.Users.destroy({
      where: {
        id: idUserRegister,
      },
    });
    res.redirect("/user/search");
  },
};
