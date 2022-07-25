const { Router } = require("express");
const {
  userListEmails,
  userList,
} = require("../../controllers/api/UserListApiController");
const router = Router();

router.get("/user/list", userListEmails);
router.get("/table-users", userList);
module.exports = router;
