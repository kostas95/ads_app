const express = require('express');
const router = express.Router();

// Define a route to render the home page
router.get('/', (req, res) => {
    // You can render an HTML file or use a template engine like EJS or Handlebars
    res.sendFile('index.html', { root: 'public' });
});

module.exports = router;
