const express = require('express');
const router = express.Router();

router.get('/', (requete, reponse) => reponse.send('salut'));

module.exports = router;