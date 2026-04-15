const express = require('express');
const app = express();

app.get('/about', (req, res) => {
    res.send('About Us');
});

app.use((req, res, next) => {
    const d = new Date();
    console.log(`Time: ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);
    next()
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});