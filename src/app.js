const express = require('express');
const userRouter = require('./user.router.js/user.auth.router');

const app = express();
app.use(express.json());

app.use('/api/auth/', userRouter)

module.exports = app;