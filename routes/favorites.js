const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile('favorites.html', { root: 'public/src' });
});

module.exports = router;
