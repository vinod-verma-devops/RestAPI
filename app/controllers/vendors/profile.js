var mongoose = require('mongoose');
var Vendor = require('../../../app/models/vendors');

module.exports.profileRead = function(req, res) {

	// If no vendor ID exists in the JWT return a 401
	if (!req.payload._id) {
		res.status(401).json({
			"message" : "UnauthorizedError: private profile"
		});
	} else {
		// Otherwise continue
		Vendor
			.findById(req.payload._id)
			.exec(function(err, vendor) {
				res.status(200).json(vendor);
			});
	}

};