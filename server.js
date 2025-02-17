const express = require('express');
const app = express();
const path = require('path');

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Route for the index page
app.get('/', (req, res) => {
    console.log('Index route hit');
    res.render('pages/index');
});

// Route for the glasses page
app.get('/glasses', (req, res) => {
    console.log('Index route hit');
    res.render('pages/glasses');
});

// Route for the sunglasses page
app.get('/sunglasses', (req, res) => {
    console.log('Index route hit');
    res.render('pages/sunglasses');
});

// Route for the stores page
app.get('/stores', (req, res) => {
    console.log('Index route hit');
    res.render('pages/stores');
});

// Route for the all-products page
app.get('/all-products', (req, res) => {
    console.log('Index route hit');
    res.render('pages/all-products');
});

// Route for the login page
app.get('/login', (req, res) => {
    console.log('Index route hit');
    res.render('pages/login');
});

// Route for the cart page
app.get('/cart', (req, res) => {
    console.log('Index route hit');
    res.render('pages/cart');
});

// Route for product Lilo
app.get('/product-lilo', (req, res) => {
    console.log('Index route hit');
    res.render('pages/product-lilo');
});

// Route for product Gimpo
app.get('/product-gimpo', (req, res) => {
    console.log('Index route hit');
    res.render('pages/product-gimpo');
});

// Route for product Lee
app.get('/product-lee', (req, res) => {
    console.log('Index route hit');
    res.render('pages/product-lee');
});

// Route for product Babo
app.get('/product-babo', (req, res) => {
    console.log('Index route hit');
    res.render('pages/product-babo');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});