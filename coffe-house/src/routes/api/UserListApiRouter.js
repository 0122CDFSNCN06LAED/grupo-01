const { Router } = require("express");
const {
  userListEmails,
  userList,
  allUsers,
} = require("../../controllers/api/UserListApiController");
const router = Router();

router.get("/user/list", userListEmails);
router.get("/table-users", userList);
router.get("/users", allUsers);
module.exports = router;
