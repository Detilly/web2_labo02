const express = require('express');
const router = express.Router();

router.get('/login', (requete, reponse) => reponse.render('login'));
router.get('/register', (requete, reponse) => reponse.render('register'));

module.exports = router;