const productRouter = require("./router/productApi");
const userRouter = require("./router/userApi");
const middleware = require("./authMiddlewarefolder/authMiddleware");

const express = require("express");
const app = express();

app.use(express.json())

app.use("/userData", middleware, userRouter)
app.use("/product", middleware, productRouter)

app.listen(5000, () => {
  console.log("APIs is running on port 3000");
})