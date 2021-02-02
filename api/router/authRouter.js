const express = require('express');
const { CreateUserController, LoginUserController, DeleteUserController } = require('../controller/authController');
const router = express.Router();

router.post('/create-user', CreateUserController)
router.post('/login-user', LoginUserController)
router.delete('/delete-user/:uid', DeleteUserController)

module.exports = router