const Joi = require("joi");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(30),
  phone: Joi.number().optional()
});

const userAuth = async (req, res) => {
  try {
    await schema.validateAsync(req.body)
    const { username, email, password, phone } = req.body;

    const hashPassword = await bcrypt.hash(password, 10)

    await User.create({ username, email, password: hashPassword, phone })

    res.status(201).json({
      status: 201,
      message: 'user created successfully',
    })

  }
  catch (error) {
    res.status(500).json({
      status: 500,
      message: "internal server errror",
      error: error.message
    })
  }
}

module.exports = userAuth;