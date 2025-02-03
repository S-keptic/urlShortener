const { Url, Analytics } = require('../models');
const shortid = require('shortid');
const axios = require('axios');
const geoip = require('geoip-lite');

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
        console.error("Error creating shortened URL:", error);
        res.status(500).json({ error: "Error creating shortened URL" });
    }
};

const redirectToOriginalUrl = async (req, res) => {
    const shortenedUrl = req.params.shortened_url;  
    const userAgent = req.headers['user-agent'];
    const referer = req.headers['referer'] || 'Direct Visit';
    const ipAddress = req.ip.startsWith('::ffff:') ? req.ip.slice(7) : req.ip; 

    try {
        const url = await Url.findOne({ where: { shortened_url: shortenedUrl } });

        if (!url) {
            return res.status(404).json({ message: "URL does not exist!" }); 
        }

        let country = "Unknown";
        let city = "Unknown";

        try {
            const ipResponse = await axios.get(`https://ipinfo.io/${ipAddress}/json`);
            country = ipResponse.data.country || "Unknown";
            city = ipResponse.data.city || "Unknown";
        } catch (error) {
            console.error("Failed to fetch location from ipinfo.io, using geoip-lite:", error);
            const geo = geoip.lookup(ipAddress);
            if (geo) {
                country = geo.country || "Unknown";
                city = geo.city || "Unknown";
            }
        }

        await Analytics.create({
            url_id: url.id,
            accessed_at: new Date(),
            ip_address: ipAddress,
            user_agent: userAgent,
            referer: referer,
            country: country,
            city: city
        });

        res.redirect(url.original_url); 
    } catch (error) {
        console.error("Error during redirection:", error);
        res.status(500).json({ error: "Error during redirection" });
    }
};

const getAnalytics = async (req, res) => {
    const shortenedUrl = req.params.shortened_url;

    try {
        const url = await Url.findOne({ where: { shortened_url: shortenedUrl } });
        if (!url) {
            return res.status(404).json({ message: "URL not found!" });
        }

        const analyticsData = await Analytics.findAll({ where: { url_id: url.id } });

        res.json({
            originalUrl: url.original_url,
            totalClicks: analyticsData.length,
            analytics: analyticsData
        });
    } catch (error) {
        console.error("Error fetching analytics:", error);
        res.status(500).json({ error: "Error fetching analytics" });
    }
};

module.exports = { createShortUrl, redirectToOriginalUrl, getAnalytics };
