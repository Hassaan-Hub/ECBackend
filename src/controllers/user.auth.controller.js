const Joi = require("joi");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../helper/nodemailer");

const signSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(30),
  phone: Joi.number().optional()
});

// signup user
const userAuth = async (req, res) => {
  try {
    await signSchema.validateAsync(req.body)
    const { username, email, password, phone } = req.body;

    const saltRounds = 12;
    const hashPassword = await bcrypt.hash(password, saltRounds)

    const user = await User.create({ username, email, password: hashPassword, phone })

    transporter.sendMail({
      from: `"My App" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Welcome to My App 🎉",

      html: `
                <div style="
                    font-family: Arial, sans-serif;
                    padding: 30px;
                    background-color: #f4f4f4;
                ">
                    <div style="
                        max-width: 600px;
                        margin: auto;
                        background: white;
                        padding: 30px;
                        border-radius: 10px;
                    ">
                        <h2 style="color: #333;">
                            Welcome ${username}! 👋
                        </h2>

                        <p>
                            Your account has been successfully created.
                        </p>

                        <p>
                            Thank you for joining our application.
                        </p>

                        <a href="http://localhost:5173"
                           style="
                           display: inline-block;
                           padding: 12px 20px;
                           background: #007bff;
                           color: white;
                           text-decoration: none;
                           border-radius: 5px;
                           ">
                           Open App
                        </a>

                        <p style="margin-top: 25px; color: #777;">
                            Regards,<br>
                            My App Team
                        </p>
                    </div>
                </div>
            `
    });

      const older_token = jwt.sign({ userId: user._id, username, email }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

    res.status(201).json({
      status: 201,
      message: "Signup successful! A verification email has been sent to your email address.",
      user,
      older_token
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


const loginSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(6).max(30)
});

// signup user
const userLogin = async (req, res) => {
  try {
    await loginSchema.validateAsync(req.body);
    const { email, password } = req.body;
    const existedUser = await User.findOne({ email });
    if (!existedUser) {
      return res.status(400).json({
        status: 400,
        message: "please enter valid email"
      })
    }

    const passwordMatch = await bcrypt.compare(password, existedUser.password)
    if (!passwordMatch) {
      return res.status(401).json({
        status: 401,
        message: "Invalid password"
      });
    }

    const loggined = await User.findById(existedUser._id).select("-password")

    const older_token = jwt.sign({ userId: existedUser._id, name: existedUser.username, email:existedUser.email }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

    return res.status(200).json({
      status: 200,
      message: "Login successful",
      user: loggined,
      older_token
    });
  }
  catch (error) {
    return res.status(500).json({
      status: 500,
      message: "internal server errror",
      error: error.message
    })

  }
}




module.exports = {
  userAuth,
  userLogin
};