const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Usagers = require('../modeles/usagers');

router.get('/login', (requete, reponse) => reponse.render('login'));

router.get('/logout', (requete, reponse) => {
requete.logout();
requete.flash('succes_msg', 'Deconnection réussie');
reponse.redirect('/usagers/login');
});

router.get('/register', (requete, reponse) => reponse.render('register'));

router.post('/login', (requete, reponse, next) => {
    passport.authenticate('local', {
        successRedirect: '/contenu',
        badRequestMessage: 'Remplir tout les champs',
        failureRedirect: '/usagers/login',
        failureFlash: true
    })(requete, reponse, next);
});

router.post('/register', (requete, reponse) => {
    // console.log(requete.body);
    const { nom, email, password, password2 } = requete.body;
    let erreurs = [];

    if (!nom || !email || !password || !password2) {
        erreurs.push( { msg: 'Remplir tous les champs' } );
    }
    if (password != password2) {
        erreurs.push( { msg: 'Les mots de passe ne sont pas identiques'});
    }
    if (password.length < 6) {
        erreurs.push( { msg: 'Le mot de passe doit etre de 6 car minimum'});
    }
    if (erreurs.length > 0) {
        reponse.render('register', {
            erreurs,
            nom,
            email,
            password,
            password2
        });
    } else {
        Usagers.findOne({ email: email }).then(usager => {
            if (usager) {
                erreurs.push({ msg: 'Ce courriel existe deja'});
                reponse.render('register', {
                    erreurs,
                    nom,
                    email,
                    password,
                    password2
                });                
            } else {
                const nouveauUsager = new Usagers({
                    nom,
                    email,
                    password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(password, salt, (err, hache) => {
                        if (err) throw err;
                        // nouveau mot de passe est dans le hache
                        nouveauUsager.password = hache;
                        nouveauUsager.save()
                        .then(user => {
                            // console.log(nouveauUsager);
                            requete.flash(
                                'succes_msg', "Ce email vient d'être inséré dans la BD et vous pouvez vous connecter"
                            );
                            reponse.redirect('/usagers/login');
                        })
                        .catch(err => console.log(err));
                    });
                });
            }
        })
    }

    
});
module.exports = router;