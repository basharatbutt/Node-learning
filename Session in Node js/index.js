const express = require('express');
const app = express();

const session = require('express-session');

app.use(session({
    secret: 'secretpassword',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60} // 1 hour
}));

app.post('/login', (req, res) => {
    res.send('<h1> Home Page </h1>');
})

app.post('/set-username', (req, res) => {
    req.session.username = "basharat"
    res.send('<h1> Username has been set in session </h1>');
})

app.post('/set-username', (req, res) => {
   if(req.session.username){
res.send(`<h1> Username in session is ${req.session.username} </h1>`);
   } else{
    res.send('<h1> No username found in session </h1>')
   }
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
});