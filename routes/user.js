const express = require('express');
const UserController = require('../controllers/UserController');
const { render } = require('ejs');
const router = express.Router();


//http://localhost:3000
router.get('/' , (req , res) => {
    res.render('home');
})
//http://localhost:3000/user/signup
router.get('/user/signup' ,(req, res) => {
    res.render('signup');
})
//http://localhost:3000/add/user
router.post('/add/user' , (req , res) => {
    UserController.addUser(req , res);
})
router.post('/login' ,(req, res) => {
    UserController.doLogin(req , res);
})
router.get('/student/add/page' ,(req, res) => {
    res.render('addStudent');
})

module.exports = router;