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

router.post('/login', async (req,res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        // if User.findOne returns null/ or undefined it won't 
        if (user) {
            // compare their passwords
            if (bcrypt.compareSync(req.body.password, user.password)) {
                 // if true lets log them in 
                 // start our session
                req.session.message = '';
                // if there are failed attempts, get rid of the msessage from the session
                req.session.username = user.username;
                req.session.logged = true;
                console.log(req.session);
                res.redirect('/auth/success');
            } else {
                //if the passwords don't match 
                req.session.message = 'Username or password is incorrect'
                res.redirect('/');
            }
        } else {
            req.session.message = "Username or password is incorrect"
        }
    } catch (err) {
        console.log(err);
    }
})

router.post('/registration', async (req, res) => {
    const password = req.body.password;
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const userDbEntry = {};
    // right side of these are the info from the form
    // and our hashed password not the password from the form
    userDbEntry.username = req.body.username;
    userDbEntry.password = passwordHash;
    userDbEntry.email = req.body.email;     

    const createdUser = await User.create(userDbEntry);
    console.log(createdUser);
    req.session.username = createdUser.username;
    req.session.logged = true;

    res.redirect('/auth/success');
})

router.get('/logout', (req, res) => {
    // creates a brand new cookie, without any of our properties
    // that we previously added to it 
    req.session.destroy((err) => {
        err
            ? console.log(err)
            : res.redirect('/')
    })
})

module.exports = router; 