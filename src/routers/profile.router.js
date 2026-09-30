const express = require("express");
const authMiddleware = require("../midleware/authMidleware");
const profileRouter = express.Router();


profileRouter.get("/profile", authMiddleware, (req, res) => {

  res.status(200).json({
    status: 200,
    message: "Profile fetched successfully",
    user: req.user
  });

});

module.exports = profileRouter;