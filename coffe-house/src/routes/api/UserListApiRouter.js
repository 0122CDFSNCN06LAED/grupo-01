const { Router } = require("express");
const { userList } = require("../../controllers/api/UserListApiController");
const router = Router();

router.get("/user/list", userList);
module.exports = router;
