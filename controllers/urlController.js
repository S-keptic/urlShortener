const { Url, Analytics } = require('../models');
const shortid = require('shortid');


const createShortUrl = async (req, res) => {
    const { originalUrl } = req.body;
    const shortened_url = shortid.generate(); 

    try {
        const newUrl = await Url.create({
            original_url: originalUrl,  
            shortened_url: shortened_url, 
        });
        res.status(201).json({ shortened_url: newUrl.shortened_url }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating shortened URL" });
    }
};


const redirectToOriginalUrl = async (req, res) => {
    const shortenedUrl = req.params.shortened_url;  

    try {
        const url = await Url.findOne({ where: { shortened_url: shortenedUrl } });

        if (!url) {
            return res.status(404).json({ message: "URL does not exist!" }); 
        }

        await Analytics.create({ url_id: url.id });  

        res.redirect(url.original_url); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error during redirection" });
    }
};

module.exports = { createShortUrl, redirectToOriginalUrl };
