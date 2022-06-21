const path = require("path");
const express = require("express");
const userController = require("../controllers/userController");
const multer = require("multer");
const validateRegister = require("../middlewares/validateRegisterMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const userSequelizeController = require("../controllers/userSequelizeController");
const {
  validateSearch,
  validateSearchUserRegister,
} = require("../middlewares/validationUserSearchMiddleware");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/img/users"));
  },
  filename: (req, file, cb) => {
    const newFilename = "user-" + Date.now() + path.extname(file.originalname);
    cb(null, newFilename);
  },
});
const uploadFile = multer({ storage });

router.get("/user/login", guestMiddleware, userSequelizeController.login);
router.post("/user/login", userSequelizeController.loginProcess);
router.get("/user/register", guestMiddleware, userSequelizeController.register);
router.post(
  "/user/register",
  uploadFile.single("avatar"),
  validateRegister,
  userSequelizeController.userCreate
);
router.get("/user/profile", authMiddleware, userSequelizeController.profile);
router.get("/user/logout", userSequelizeController.logout);
router.get("/user/detail/:id", userSequelizeController.userDetail);
router.put(
  "/user/edit/:id",
  uploadFile.single("avatar"),
  validateSearchUserRegister,
  userSequelizeController.update
);
router.get(
  "/user/delete/confirm/:id",
  userSequelizeController.userDeleteConfim
);
router.delete(
  "/user/delete/:id",
  uploadFile.single("avatar"),
  userSequelizeController.destroy
);

module.exports = router;
