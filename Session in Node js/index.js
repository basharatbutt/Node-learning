const express = require('express');
const app = express();
const session = require('express-session');

app.use(session({
    secret: 'secretpassword',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
}));

app.get('/', (req, res) => {
    res.send('<h1> Home Page </h1> <br> <a href="/get-username">Check Status</a>');
});

app.get('/set-username', (req, res) => {
    req.session.username = "basharat";
    res.send('<h1> Username "basharat" has been set! </h1> <a href="/get-username">Check Username</a>');
});

app.get('/get-username', (req, res) => {
    if (req.session.username) {
        res.send(`<h1> Username in session is: ${req.session.username} </h1> <a href="/destroy">Logout/Destroy</a>`);
    } else {
        res.send('<h1> No username found! </h1> <a href="/set-username">Set it here</a>');
    }
});

// FIXED DESTROY ROUTE
app.get('/destroy', (req, res) => {
    req.session.destroy(err => {
        if (err) {      
            return res.send('<h1>Error destroying session</h1>');       
        }
        res.send('<h1> Session destroyed! </h1> <a href="/">Go Home</a>');
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});