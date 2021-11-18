const mongoose = require('mongoose');

// schema de donnees pour les Usagers
// _id, nom, email, password, date
let schemaUsager = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

let Usagers = module.exports = mongoose.model('Usagers', schemaUsager);