const express = require("express");
const userController = require("../controllers/userController");
const multer = require("multer");
const path = require("path");
const validateRegister = require("../middlewares/validateRegisterMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const userSequelizeController = require("../controllers/userSequelizeController");
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
router.get("/user/profile", authMiddleware, userController.profile);
router.get("/user/logout", userController.logout);
module.exports = router;
