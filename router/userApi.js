const express = require("express");

const userRouter = express.Router();

userRouter.use(express.json());

const userData = [
    { "id": 1, "name": "Hassaan", "email": "hassaan@example.com", "city": "Karachi" },
    { "id": 2, "name": "Daniyal", "email": "daniyal@example.com", "city": "lahore" },
    { "id": 3, "name": "Kaif", "email": "kaif@example.com", "city": "Karachi" },
    { "id": 4, "name": "Usama", "email": "usama@example.com", "city": "Islamabad" },
    { "id": 5, "name": "Ali", "email": "ali@example.com", "city": "karachi" }
];


userRouter.get("/", (req, res) => {
    res.status(200).json({
        message: "Users retrieved successfully",
        data: userData
    });
});


userRouter.get("/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = userData.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json({
        message: "User retrieved successfully",
        data: user
    });
});


userRouter.post("/", (req, res) => {
    const { name, email, city } = req.body;

    if (!name || !email || !city) {
        return res.status(400).json({
            message: "Name, email, and city are required"
        });
    }

    const newUser = { id: userData.length + 1, name, email, city };
    userData.push(newUser);

    res.status(201).json({
        message: "User created successfully",
        data: newUser
    });
});


userRouter.put("/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = userData.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const { name, email, city } = req.body;

    if (!name || !email || !city) {
        return res.status(400).json({
            message: "Name, email, and city are required"
        });
    }

    user.name = name;
    user.email = email;
    user.city = city;

    res.status(200).json({
        message: "User updated successfully",
        data: user
    });
});


userRouter.delete("/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = userData.findIndex(u => u.id === userId);

    if (
        userIndex === -1 || userIndex >= userData.length
    ) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    userData.splice(userIndex, 1);

    res.status(200).json({
        message: "User deleted successfully"
    });
});

module.exports = userRouter;