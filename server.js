const router = require("./router/userApi");

const express = require("express");
const app = express();


app.use("/userData", router)

app.listen(5000, () => {
  console.log("User API is running on port 3000");
})