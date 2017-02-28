var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

var Model = require('../model');

var User = Model.userModel;
var Vendor = Model.vendorModel;

passport.use('local.one', new LocalStrategy({
		usernameField: 'email'
	},
	function(username, password, done) {
		
		User.findOne({ email: username }, function (err, user) {
			
			if (err) { return done(err); }

			if (!user) {
				return done(null, false, {
					message: 'User not found'
				});
			}

			if (!user.validPassword(password)) {
				return done(null, false, {
					message: 'Password is wrong'
				});
			}

			return done(null, user);
		});
	}
));

passport.use('local.two', new LocalStrategy(
	
	function(username, password, done) {
		
		Vendor.findOne({ username: username }, function (err, vendor) {
			
			if (err) { return done(err); }

			if (!vendor) {
				return done(null, false, {
					message: 'Vendor not found'
				});
			}

			if (!vendor.validPassword(password)) {
				return done(null, false, {
					message: 'Password is wrong'
				});
			}

			return done(null, vendor);
		});
	}
));
