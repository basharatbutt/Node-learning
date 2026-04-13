import express from 'express';
const app = express();
import { connectDB } from './config/database.js';
import Contact from './models/contacts.model.js';
import contactRoutes from './routes/contact.routes.js';


connectDB();

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// --- NOTE: I DELETED the "let contacts = [...]" array because it was causing the errors ---
app.use("/","contactRoutes");


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});