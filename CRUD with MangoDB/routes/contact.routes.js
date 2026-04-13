import express from 'express';
const router = express.Router();

// 2. HOME: Fetch all contacts from MongoDB
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.render('home', { contacts });
    } catch (err) {
        res.status(500).send("Error fetching contacts");
    }
});

// 3. ADD CONTACT: Show form
router.get('/add-contact', (req, res) => {
    res.render('add-contact');
});

// 4. ADD CONTACT: Save to MongoDB
router.post('/add-contact', async (req, res) => {
    try {
        await Contact.create({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone
        });
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Error adding contact");
    }
});

// 5. VIEW CONTACT: Find by MongoDB _id
router.get('/show-contact/:id', async (req, res) => {
    try {
        // We use findById and we DO NOT use parseInt
        const contact = await Contact.findById(req.params.id);
        if (contact) {
            res.render('show-contact', { contact: contact });
        } else {
            res.status(404).send("Contact not found");
        }
    } catch (err) {
        res.status(500).send("Invalid ID Format");
    }
});

// 6. UPDATE CONTACT: Show form with data
router.get('/update-contact/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        res.render('update-contact', { contact: contact });
    } catch (err) {
        res.redirect('/');
    }
});

// 7. UPDATE CONTACT: Save changes to MongoDB
router.post('/update-contact/:id', async (req, res) => {
    try {
        await Contact.findByIdAndUpdate(req.params.id, {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone
        });
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Error updating contact");
    }
});

// 8. DELETE CONTACT: Remove from MongoDB
router.get('/delete-contact/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Error deleting contact");
    }
});

export default router;