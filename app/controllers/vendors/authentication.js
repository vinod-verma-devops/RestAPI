var passport = require('passport');
var mongoose = require('mongoose');

// Import Vendor.js
var Vendor = require('../../../app/models/vendors');

var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.register = function(req, res) {
	var vendor = new Vendor();
	
	vendor.name = req.body.name;
	vendor.email = req.body.email.toLowerCase();
	vendor.username = req.body.username.toLowerCase();
	
	vendor.setPassword(req.body.password);
	
	vendor.save(function(err) {
		var token;
		token = vendor.generateJwt();
		res.status(200);
		res.json({
			"token" : token
		});
	});
};

module.exports.login = function(req, res) {

	passport.authenticate('local.two', function(err, vendor, info){
		var token;
	
		// If Passport throws/catches an error
		if (err) {
			res.status(404).json(err);
			return;
		}
	
		// If a vendor is found
		if(vendor){
			token = vendor.generateJwt();
			res.status(200);
			res.json({
				"token" : token
			});
		} else {
			// If vendor is not found
			res.status(401).json(info);
		}
	})(req, res);
};