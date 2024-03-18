// controllers/userController.js
const User = require('../models/userModel');

let users = [];

function loginUser(req, res) {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    return user;
}

function registerUser(req, res) {
    const { name, email, password } = req.body;
    const existingUser = users.find(user => user.email === email);
    if (!existingUser) {
        const newUser = new User(name, email, password);
        users.push(newUser);
    }
    return existingUser;
}

function deleteUser(req, res) {
    const userEmail = req.body.email;
    users = users.filter(user => user.email !== userEmail);
    return userEmail;
}

function getAllUsers() {
    return users;
}

module.exports = {
    loginUser,
    registerUser,
    deleteUser,
    getAllUsers
};
