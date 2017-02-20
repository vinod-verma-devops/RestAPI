var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
	secret: 'MY_SECRET',
	userProperty: 'payload'
});


// Import Users.js
var User = require('../../app/models/users');


var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');


// User Profile
router.get('/profile', auth, ctrlProfile.profileRead);

// User Authentication
router.post('/register', ctrlAuth.register);
router.post('/login', emailToLowerCase, ctrlAuth.login);


// Middleware to transform email to lowercase for verification purposes
function emailToLowerCase(req, res, next){
    req.body.email = req.body.email.toLowerCase();
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