// 1. Import Express
const express = require('express');

// 2. Initialize the Express application
const app = express();

// 3. Define a Port number
const PORT = 3000;

// 4. Create a "Route" (What happens when someone visits your website)
app.get('/', (req, res) => {
    res.send('<h1>Welcome to my Express Server!</h1>');
});

// 5. Create an "About" Route
app.get('/about', (req, res) => {
    res.send('<h3>This is the About Page</h3>');
});

app.get('/user/:userid/book/:bookid', (req, res) => {
    res.send(req.params);
});

app.get('/search', (req, res) => {
    res.send(req.query);
});

// 6. Start the server and "Listen" for requests
app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});