const express = require('express');
const { CreateUserController, LoginUserController, DeleteUserController } = require('../controller/authController');
const router = express.Router();

//localhost:2727/api/auth/create-user
router.post('/create-user', CreateUserController)
//http://localhost:2727/api/auth/login-user
router.post('/login-user', LoginUserController)
//http://localhost:2727/api/auth/delete-user/0YBIMc6dDuXPYNGFKtCbF26whCW2
router.delete('/delete-user/:uid', DeleteUserController)

module.exports = router