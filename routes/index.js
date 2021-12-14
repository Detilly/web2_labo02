const express = require('express');
const router = express.Router();
const { estAuthentifie } = require('../config/auth');

router.get('/', (requete, reponse) => reponse.render('index'));
router.get('/contenu', estAuthentifie, (requete, reponse) => 
    reponse.render('contenu', {
        user: requete.user
    }));

module.exports = router;