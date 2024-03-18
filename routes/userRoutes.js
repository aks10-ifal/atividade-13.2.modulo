// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/profile');
    } else {
        res.render('login', { error: null });
    }
});

router.post('/login', (req, res) => {
    const user = userController.loginUser(req, res);
    if (user) {
        req.session.user = user;
        res.redirect('/profile');
    } else {
        res.render('login', { error: 'Credenciais inválidas' });
    }
});

router.get('/profile', (req, res) => {
    if (req.session.user) {
        res.render('profile', { user: req.session.user });
    } else {
        res.redirect('/');
    }
});

router.get('/register', (req, res) => {
    res.render('register', { error: null });
});

router.post('/register', (req, res) => {
    const existingUser = userController.registerUser(req, res);
    if (existingUser) {
        res.render('register', { error: 'E-mail já cadastrado' });
    } else {
        res.redirect('/');
    }
});

router.get('/users', (req, res) => {
    const users = userController.getAllUsers();
    if (req.session.user) {
        res.render('users', { users });
    } else {
        res.redirect('/');
    }
});

router.post('/delete-user', (req, res) => {
    const userEmail = userController.deleteUser(req, res);
    if (req.session.user && req.session.user.email === userEmail) {
        req.session.destroy(err => {
            if (err) {
                console.log(err);
            }
            res.clearCookie('connect.sid');
            res.redirect('/');
        });
    } else {
        res.redirect('/users');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        } else {
            res.clearCookie('connect.sid');
            res.redirect('/');
        }
    });
});

module.exports = router;
