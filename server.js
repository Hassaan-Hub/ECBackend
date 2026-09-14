const user = require("./users/userApi.js");



user.listen(3000, () => {
  console.log("User API is running on port 3000");
})