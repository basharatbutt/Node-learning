const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    address: String
});

module.exports = mongoose.model('Contact', contactSchema);