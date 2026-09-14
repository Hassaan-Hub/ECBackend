const userRouter = require("./router/userApi");

const express = require("express");
const app = express();


app.use("/userData", userRouter)

app.listen(5000, () => {
  console.log("User API is running on port 3000");
})