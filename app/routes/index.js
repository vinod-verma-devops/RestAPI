var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({secret: 'MY_SECRET', userProperty: 'payload'});

var multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();

// Import Users.js
var User = require('../../app/models/users');
var Vendor = require('../../app/models/vendors');
var Product = require('../../app/models/products');

var userProfile = require('../controllers/users/profile');
var userAuth = require('../controllers/users/authentication');

var vendorProfile = require('../controllers/vendors/profile');
var vendorAuth = require('../controllers/vendors/authentication');

var productCreate = require('../controllers/products/product');

var imgUpload = require('../controllers/aws/aws');


// User Profile
router.get('/users/profile', auth, userProfile.profileRead);

router.get('/vendors/profile', auth, vendorProfile.profileRead);

// User Authentication
router.post('/users/register', userAuth.register);
router.post('/users/login', emailToLowerCase, userAuth.login);

router.post('/vendors/register', vendorAuth.register);
router.post('/vendors/login', usernameToLowerCase, vendorAuth.login);

router.post('/products/create', productCreate.create);

router.post('/images/upload', multipartyMiddleware, imgUpload.create);

//router.delete('/images/delete', imgUpload.delete);


// Middleware to transform email to lowercase for verification purposes
function emailToLowerCase(req, res, next){
    req.body.email = req.body.email.toLowerCase();
    next();
}

function usernameToLowerCase(req, res, next){
    req.body.username = req.body.username.toLowerCase();
    next();
}


// Routes ending in /users
router.route('/users')
    
    // Get all the users
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });
    
router.route('/vendors')
    
    // Get all the vendors
    .get(function(req, res) {
        Vendor.find(function(err, vendors) {
            if (err)
                res.send(err);

            res.json(vendors);
        });
    });
    
router.route('/products')
    
    // Get all the products
    .get(function(req, res) {
        Product.ProductModel.find(function(err, products) {
            if (err)
                res.send(err);

            res.json(products);
        });
    });
 
router.route('/products/short')
    
    // Get all the products
    .get(function(req, res) {
        Product.ProductModel.find({}, 'title location price', function(err, products) {
            if (err)
                res.send(err);

            res.json(products);
        });
    });


router.route('/products/:product_id')
    
    // Get all the products
    .get(function(req, res) {
        Product.ProductModel.findById(req.params.product_id, function(err, product) {
            if (err)
                res.send(err);
            res.json(product);
        });
    })
    
    .put(function(req, res) {

        Product.ProductModel.findById(req.params.product_id, function(err, product) {

            if (err)
                res.send(err);
			
			if (req.body.title)
            	product.title = req.body.title;
            if (req.body.location)
            	product.location = req.body.location;
            if (req.body.description)
            	product.description = req.body.description;
            if (req.body.price)
            	product.price = req.body.price;
            if (req.body.frequency)
            	product.frequency = req.body.frequency;
            if (req.body.age)
            	product.age = req.body.age;
            if (req.body.note)
            	product.note = req.body.note;

            product.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Product updated!' });
            });

        });
    })
    
    // Delete user with specific id
    .delete(function(req, res) {
        Product.ProductModel.remove({
            _id: req.params.product_id
        }, function(err, user) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// Routes ending in /users/:user_id
router.route('/users/:user_id')
	
	// Get user with specific id
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })
    
    // Modify user with specific id
    .put(function(req, res) {

        User.findById(req.params.user_id, function(err, user) {

            if (err)
                res.send(err);

            user.name = req.body.name;

            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'User updated!' });
            });

        });
    })
    
    // Delete user with specific id
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;