const express = require('express');
const router = express.Router();
const { createShortUrl, redirectToOriginalUrl } = require('../controllers/urlController');


router.post('/shorten', createShortUrl);


router.get('/:shortened_url', redirectToOriginalUrl); 

module.exports = router;
