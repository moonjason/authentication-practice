const express = require('express');
const app = express();
const session = require('express-session');
require('./db/db');

app.use(session({
    secret: 'this is a random secret string',
    resave: false,
    saveUninitialized: false
}));

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    console.log(req.session, 'home route');
    res.render('home', {
        message: req.session.message,
        logOut: req.session.logOutMsg
    })
})

app.listen(3000, () => {
    console.log('server listening on port', 3000)
})