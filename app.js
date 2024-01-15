const express = require("express");
const app = express();
const PORT = 8080;


const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const db = require('./keys.js').MongoURI;

mongoose.connect(db).then(() => console.log("MongoDB Connected...")).catch((err) => console.log(err))

app.use(express.urlencoded({ extended: false }));

// Use body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// This middleware is to server the static files (html files for ui)
app.use(express.static('public'));

// GET Render pages
const indexRoute = require('./routes/index');
const aboutRoute = require('./routes/about');
const categoryRoute = require('./routes/category');
const contactRoute = require('./routes/contact');
const registerRoute = require('./routes/register');
const subcategoryRoute = require('./routes/subcategory');
const favoritesRoute = require('./routes/favorites.js');

app.use('/', indexRoute);
app.use('/about', aboutRoute);
app.use('/category', categoryRoute);
app.use('/contact', contactRoute);
app.use('/register', registerRoute);
app.use('/subcategory', subcategoryRoute);
app.use('/favorites', favoritesRoute);


const usersRoute = require('./routes/users');
app.use('/users', usersRoute);
const adsRoute = require('./routes/ads.js');
app.use('/ads', adsRoute);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on port ${PORT}`);
});