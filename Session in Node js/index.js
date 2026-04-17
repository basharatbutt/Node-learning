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
    res.send('<h1> Home Page </h1>');
});

app.get('/set-username', (req, res) => {
    req.session.username = "basharat";
    res.send('<h1> Username "basharat" has been set in session </h1> <a href="/get-username">Check Username</a>');
});

app.get('/get-username', (req, res) => {
    if (req.session.username) {
        res.send(`<h1> Username in session is: ${req.session.username} </h1>`);
    } else {
        res.send('<h1> No username found in session! </h1> <a href="/set-username">Set it here</a>');
    }
});

app.get('/destroy', (req, res) => { // Removed the ) from here
    req.session.destroy(err => {
        if (err) {      
            return res.send('<h1>Error destroying session</h1>');       
        }
        // It is also good practice to clear the cookie from the browser
        res.clearCookie('connect.sid'); 
        res.send('<h1> Session destroyed! </h1> <a href="/">Go Home</a>');
    });
}); // Parenthesis moved to here

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});