const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile('/subcategories.html', { root: 'public/src' });
});

module.exports = router;
