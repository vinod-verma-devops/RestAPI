var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
	secret: 'MY_SECRET',
	userProperty: 'payload'
});


// Import Users.js
var User = require('../../app/models/users');

var Vendor = require('../../app/models/vendors');


var userProfile = require('../controllers/users/profile');
var userAuth = require('../controllers/users/authentication');

var vendorProfile = require('../controllers/vendors/profile');
var vendorAuth = require('../controllers/vendors/authentication');


// User Profile
router.get('/users/profile', auth, userProfile.profileRead);

router.get('/vendors/profile', auth, vendorProfile.profileRead);

// User Authentication
router.post('/users/register', userAuth.register);
router.post('/users/login', emailToLowerCase, userAuth.login);

router.post('/vendors/register', vendorAuth.register);
router.post('/vendors/login', usernameToLowerCase, vendorAuth.login);


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
    
    // Get all the users
    .get(function(req, res) {
        Vendor.find(function(err, vendors) {
            if (err)
                res.send(err);

            res.json(vendors);
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