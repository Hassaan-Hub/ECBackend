const express = require('express');
const userRouter = require('./routers/user.auth.router');
const profileRouter = require('./routers/profile.router');
const productRouter = require('./routers/products.router');

const app = express();
app.use(express.json());


app.use('/api/auth/', userRouter)
app.use('/api/auth/', profileRouter)

app.use('/api/profile/', productRouter)


module.exports = app;