const express = require("express");
const router = express.Router();
const Ad = require("../models/Ad");
const User = require("../models/User");

router.post('/create-ad', async (req, res) => {
    try {
        const { code, title, description, cost, images, createdBy } = req.body;
        const ad = new Ad({ code, title, description, cost, images, createdBy });
        await ad.save();
        res.status(201).json({ message: 'Ad created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/favorite-ads/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        const ads = await Ad.find({ createdBy: userId});

        if (!ads) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ ads });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/favorite-ads/all/:email/:sessionId', async (req, res) => {
    try {
        const email = req.params.email;
        const sessionId = req.params.sessionId;

        const user = await User.findOne({email: email, sessionId:sessionId});

        if (user) {   
            const ads = await Ad.find({ createdBy: user.id});
            return res.status(200).json({ ads });
        }
        return res.status(404).json({ error: 'Invalid authentication' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/delete-favorite/:userId/:adId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const adId = req.params.adId;

        const ad = await Ad.findOneAndDelete({ createdBy: userId, code: adId.toString() });

        if (!ad) {
            return res.status(404).json({ error: 'Ad not found' });
        }
        res.status(200).json({ message: 'Favorite ad deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
