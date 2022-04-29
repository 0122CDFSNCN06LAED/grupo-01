const express = require('express');
const userController = require('../controllers/userController');
const multer = require("multer");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../../public/img/users"));
    },
    filename: (req, file, cb) => {
      const newFilename =
        "user-" + Date.now() + path.extname(file.originalname);
      cb(null, newFilename);
    },
  });
  const uploadFile = multer({ storage });
  
  

router.get('/user/login', userController.login);
router.get('/user/register', userController.register);
router.post("/user/register", uploadFile.single('avatar'), userController.processRegister);

module.exports= router;
