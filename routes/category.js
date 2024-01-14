const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile('categories.html', { root: 'public/src' });
});

module.exports = router;
