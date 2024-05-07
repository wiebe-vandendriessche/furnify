const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required:false,
    },
    lastname: {
        type: String,
        required:false,
    },
    email: {
        type: String,
        unique: true,
        required:false,
    },
    phone_number: {
        number: {
            type: Number,
            required: false,
        },
        country: {
            type: String,
            required: false,
        },
    },
    address: {
        type: String,
        required:false,
    }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;