var passport = require('passport');
var mongoose = require('mongoose');

var Model = require('../../model');

module.exports.register = function(req, res) {
	
	var vendor = new Model.vendorModel();
	
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
	
		if (err) {
			res.status(404).json(err);
			return;
		}
	
		if(vendor){
			token = vendor.generateJwt();
			res.status(200);
			res.json({
				"token" : token
			});
		} else {
			res.status(401).json(info);
		}
	})(req, res);
};