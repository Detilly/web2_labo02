const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 8000;
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// mes routes

app.use('/', require('./routes/index'));
app.use('/usagers', require('./routes/usagers'));

// mes views

app.set('views', './views');
app.set('layout', 'layout');
app.set('view engine', 'ejs');

// mes fichiers statiques

app.use('/css', express.static('./css'));
app.use('/images', express.static('./images'));

// connexion BD

mongoose.connect('mongodb+srv://jDetilly:XnXFoigBHGnFi57v@cluster0.qjb6e.mongodb.net/labo02?retryWrites=true&w=majority'); 

let db = mongoose.connection;
db.on('error', (err) => { console.log('erreur de la BD', err)});
db.once('open', () => {console.log('connexion de la BD OK!')});

app.listen(PORT, console.log(`Service Web démarré sur le port ${PORT}`));