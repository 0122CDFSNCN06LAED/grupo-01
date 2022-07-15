const db = require("../../database/models");

module.exports = {
  userList: async (req, res) => {
    const dbUserList = await db.Users.findAll();

    const usersEmail = dbUserList.map((user) => {
      return user.email;
    });
    res.json(usersEmail);
  },
};
