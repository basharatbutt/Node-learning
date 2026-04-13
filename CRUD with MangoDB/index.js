const express = require('express');
const app = express();

//Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));


let contacts = [
    { id: 1, firstName: "Alfred", lastName: "Kuhlman", email: "alfred@test.com", phone: "98989898" },
    { id: 2, firstName: "Frederick", lastName: "Jerde", email: "frederick@test.com", phone: "54545454" },
    { id: 3, firstName: "Joannie", lastName: "McLaughlin", email: "joannie@test.com", phone: "75757575" }
];

//routes
app.get('/', (req, res) => {
    res.render('home', { contacts: contacts });
});


app.get('/show-contact', (req, res) => {});

app.get('/add-contact', (req, res) => {
     res.render('add-contact');
});


app.post('/add-contact', (req, res) => {
      const newContact = {
        id: contacts.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone
    };
    contacts.push(newContact);
    res.redirect('/');
});

app.get('/update-contact', (req, res) => {});


app.post('/update-contact', (req, res) => {});

app.get('/delete-contact', (req, res) => {});

app.get('/show-contact/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const contact = contacts.find(c => c.id === id);
    if (contact) {
        res.render('show-contact', { contact: contact });
    } else {
        res.send("Contact not found");
    }
});

app.get('/delete-contact/:id', (req, res) => {
    const id = parseInt(req.params.id);
    // Remove the contact by keeping everyone EXCEPT the one with this ID
    contacts = contacts.filter(c => c.id !== id);
    res.redirect('/');
});

app.get('/update-contact/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const contact = contacts.find(c => c.id === id);
    res.render('update-contact', { contact: contact });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});