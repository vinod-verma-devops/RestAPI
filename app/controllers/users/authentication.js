var passport = require('passport');
var mongoose = require('mongoose');

var Model = require('../../model');

module.exports.register = function(req, res) {
	
	var user = new  Model.userModel();
	
	user.name = req.body.name;
	user.email = req.body.email.toLowerCase();
	
	user.setPassword(req.body.password);
	
	user.save(function(err) {
		var token;
		token = user.generateJwt();
		res.status(200);
		res.json({
			"token" : token
		});
	});
};

module.exports.login = function(req, res) {

	passport.authenticate('local.one', function(err, user, info){
		
		var token;
	
		if (err) {
			res.status(404).json(err);
			return;
		}
	
		if(user){
			token = user.generateJwt();
			res.status(200);
			res.json({
				"token" : token
			});
		} else {

			res.status(401).json(info);
		}
		
	})(req, res);
};