const express = require("express");
const userAuth = require('../controllers/user.auth.controller')

const userRouter = express.Router()

userRouter.post('/create-user', userAuth)

module.exports = userRouter;