const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');

router.get('/login', (req,res) => {
    res.render('login')
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/success', (req, res) => {
    res.render('dummy')
})

router.post('', (req, res) => {

})

module.exports = router; 