const productRouter = require("./router/productApi");
const userRouter = require("./router/userApi");

const express = require("express");
const app = express();


app.use("/userData", userRouter)
app.use("/product", productRouter)

app.listen(5000, () => {
  console.log("APIs is running on port 3000");
})