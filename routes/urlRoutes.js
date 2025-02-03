const express = require('express');
const router = express.Router();
const { createShortUrl, redirectToOriginalUrl, getAnalytics } = require('../controllers/urlController');


router.post('/shorten', createShortUrl);


router.get('/:shortened_url', redirectToOriginalUrl); 
router.get('/analytics/:shortened_url',getAnalytics);

module.exports = router;
