const db = require("../../database/models");

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
  userList: async (req, res) => {
    const page = Number(req.query.page) || 0;
    const pageSize = req.query.pageSize ?? 10;

    db.Users.findAndCountAll({
      include: [{ all: true }],
      limit: pageSize,
      offset: page * pageSize,
    })
      .then(({ count, rows }) => {
        const users = rows.map((user) => {
          user.password = null;
          return user;
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


};
