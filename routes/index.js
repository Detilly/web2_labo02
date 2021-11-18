const express = require('express');
const router = express.Router();

router.get('/', (requete, reponse) => reponse.render('index'));
router.get('/contenu', (requete, reponse) => reponse.render('contenu'));

module.exports = router;