const express = require("express");
const { userAuth, userLogin } = require('../controllers/user.auth.controller')

const userRouter = express.Router()

userRouter.post('/create-user', userAuth)
userRouter.post('/login', userLogin)

module.exports = userRouter;