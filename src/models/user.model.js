const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        unique: true
    },
    phone: {
        type: Number
    }
}, { timestamps: true })

const User = mongoose.model("users", userSchema);

module.exports = User;