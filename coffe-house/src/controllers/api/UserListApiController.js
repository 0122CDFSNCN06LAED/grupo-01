const db = require("../../database/models");
const { userLoggedEmail } = require("../../middlewares/userLogMiddleware");

module.exports = {
  userListEmails: async (req, res) => {
    const dbUserList = await db.Users.findAll().catch((error) => {
      console.log(error);
    });

    const usersEmail = dbUserList.map((user) => {
      return user.email;
    });
    res.json(usersEmail);
  },
  userList: (req, res) => {
    const page = Number(req.query.page) || 0;
    const pageSize = req.query.pageSize ?? 10;

    db.Users.findAndCountAll({
      include: [{ all: true }],
      limit: pageSize,
      offset: page * pageSize,
    })
      .then(({ count, rows }) => {
        const users = rows.map((user) => {
          const userDB = {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            avatar: `http://localhost:3002/img/users/${user.avatar}`,
            category: user.category.type,
          };
          /*  user.password = null;  */
          return userDB;
        });
        let respuesta = {
          meta: {
            status: 200,
            total: count,
            url: req.originalUrl,
            prevPage: page > 0,
            nextPage: (page + 1) * pageSize < count,
          },
          data: users,
        };
        res.json(respuesta);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  allUsers: (req, res) => {
    db.Users.findAndCountAll({
      include: [{ all: true }],
    }).then(({ count, rows }) => {
      rows = rows.map((user, i) => {
        const usersDb = {
          id: user.id,
          name: user.name,
          lastname: user.lastname,
          username: user.username,
          email: user.email,
          avatar: `http://localhost:3002/img/users/${user.avatar}`,
          category: user.category.type,
        };
        return usersDb;
      });

      let respuesta = {
        meta: {
          status: 200,
          total: count,
          url: req.originalUrl,
        },
        data: rows,
      };

      res.json(respuesta);
    });
  },
  userLogged: async (req, res) => {
    let userLoggedOfDb;

    const userLogEmail = userLoggedEmail();
    const userAdmin = "@coffeehouse.com";

    if (userLogEmail && userLogEmail.endsWith(userAdmin)) {
      userLoggedOfDb = await db.Users.findAll({
        where: { email: userLogEmail },
      });

      const respuesta = {
        meta: {
          status: 200,
          total: 1,
          url: req.originalUrl,
        },
        data: {
          name: userLoggedOfDb[0].name,
          avatar: `http://localhost:3002/img/users/${userLoggedOfDb[0].avatar}`,
        },
      };

      return res.json(respuesta);
    }
    const respuesta = {
      meta: {
        status: 200,
        total: 1,
        url: req.originalUrl,
      },
      data: {
        name: "Jordan Walke",
        avatar: "http://localhost:3002/img/users/jordan-walke.png",
      },
    };
    return res.json(respuesta);
  },
};
