const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
require('./config/passport')(passport);
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// format des post
app.use(express.urlencoded({ extended: false }));

// les sessions express
app.use(session({
    secret: 'trucmachinBidule',
    resave: true,
    saveUninitialized: true
}));

// pour passport
app.use(passport.initialize());
app.use(passport.session());

// connexion a flash
app.use(flash());

// nos variables globales
app.use((requete, reponse, next) => {
    reponse.locals.succes_msg = requete.flash('succes_msg');
    reponse.locals.erreur_msg = requete.flash('erreur_msg');
    reponse.locals.erreur_passeport = requete.flash('error');
    next();
});

// mes routes...
app.use('/', require('./routes/index'));
app.use('/usagers', require('./routes/usagers'));

// mes vues....
app.set('views', './views');
app.set('layout', 'layout');
app.set('view engine', 'ejs');

// mes fichiers statiques
app.use('/css', express.static('./statique/css'));
app.use('/images', express.static('./statique/images'));
app.use('/javascript', express.static('./statique/javascript'));



// connexion BD
mongoose.connect('mongodb+srv://jDetilly:XnXFoigBHGnFi57v@cluster0.qjb6e.mongodb.net/web2_TP1?retryWrites=true&w=majority'); 

let db = mongoose.connection;
db.on('error', (err) => { console.error('erreur de BD:', err)});
db.once('open', () => {console.log('connexion a la BD OK!!')});

function operation1(operande1, operande2) {
    console.log("dans oper1", operande1, "x", operande2, "=", operande1 * operande2);
}

function operation2(operande1, operande2) {
    console.log("dans oper2", operande1, "+", operande2, "=", operande1 + operande2);
}

function decide(valeur) {
    console.log("dans decide valeur vaut:", valeur);
    if (valeur ==1)
        return operation1;
    else
        return operation2
}

decide(1)(12, 9);
decide(2)(12, 9);


app.listen(PORT, console.log(`Service Web demarre sur le port ${PORT}`));