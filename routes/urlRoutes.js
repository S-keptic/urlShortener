const express = require('express');
const router = express.Router();
const { createShortUrl, redirectToOriginalUrl, getAnalytics } = require('../controllers/urlController.js');
const verifyToken = require('../middlewares/authMiddleware.js');


router.post('/shorten',verifyToken, createShortUrl);
router.get('/:shortened_url', redirectToOriginalUrl); 
router.get('/analytics/:shortened_url',verifyToken,getAnalytics);


module.exports = router;
