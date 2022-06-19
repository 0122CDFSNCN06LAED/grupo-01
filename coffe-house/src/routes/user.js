const express = require("express");
const userController = require("../controllers/userController");
const multer = require("multer");
const path = require("path");
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

router.get("/user/login", guestMiddleware, userController.login);
// router.post('/user/login',userController.loginProcess);
router.post("/user/login", userSequelizeController.logProcess);
router.get("/user/register", guestMiddleware, userController.register);
// router.post("/user/register", uploadFile.single('avatar'),validateRegister, userController.processRegister);
router.post(
  "/user/register",
  uploadFile.single("avatar"),
  validateRegister,
  userSequelizeController.userCreate
);
router.get("/user/search", userController.userSearch);
router.post("/user/search", validateSearch, userSequelizeController.userDetail);
router.get("/user/profile", authMiddleware, userController.profile);
router.get("/user/logout", userController.logout);
router.get("/user/detail/", userController.userDetail);
router.put(
  "/user/update/:id",
  uploadFile.single("avatar"),
  validateSearchUserRegister,
  userSequelizeController.update
);
router.get("/user/delete/confirm/", userController.userDeleteConfim);
router.delete(
  "/user/delete/:id",
  uploadFile.single("avatar"),
  userSequelizeController.destroy
);

module.exports = router;
