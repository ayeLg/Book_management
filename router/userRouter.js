const express = require("express");
const { getAllUser, test, user_register, user_login } = require("../controller/userController");

const router = express.Router();




router.get('/', getAllUser)
router.post('/user_register', user_register)
router.post('/user_login', user_login)



 module.exports = router;