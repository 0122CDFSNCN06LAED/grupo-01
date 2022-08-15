const { Router } = require("express");
const {
  userListEmails,
  userList,
  allUsers,
  userLogged,
} = require("../../controllers/api/UserListApiController");
const router = Router();

router.get("/user/list", userListEmails);
router.get("/table-users", userList);
router.get("/users", allUsers);
router.get("/user-logged", userLogged);

module.exports = router;
