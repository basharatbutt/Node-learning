const express = require('express');
const app = express();
const session = require('express-session');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

//database connection
mongoose.connect('mongodb://127.0.0.1:27017/user-crud')
.then( () => console.log('Connected to database'))

//midleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.set("view engine", "ejs");

//routes
app.get('/', (req, res) => {
    res.send('hello world');
})

app.get('/login', (req, res) => {
    res.send('login page');
})

app.get('/register', (req, res) => {
    res.send('register page');
})

app.listen(3000, () => {
    console.log('server is running on port 3000');
})