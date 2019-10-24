const express = require('express');
const app = express();
const session = require('express-session');
require('./db/db');


app.set('view engine', 'ejs');
app.use(session({
    secret: 'this is a random secret string',
    resave: false,
    saveUninitialized: false
}));

// app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));

const usersController = require('./controllers/users.js');
app.use('/auth', usersController)


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