var express = require('express');
var app = express();
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');

// Import User Objects
var User = require('../../app/models/users');

// Import User Authentication
var Auth = require('../../app/controllers/authentication');

// Middleware for all requests
router.use(function(req, res, next) {
    console.log('Query made.');
    next();
});

// Index API file (http://107.170.217.216:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'API is LIVE' });   
});

// Registering a new user
router.route('/register')
	
	// Create a new user
    .post(function(req, res) {
        
       Auth.register(req, res);
        
    });

// Logging in an existing user
router.route('/login')
	
	// Create a new user
    .post(function(req, res) {
        
        Auth.login(req, res);
        
    });

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