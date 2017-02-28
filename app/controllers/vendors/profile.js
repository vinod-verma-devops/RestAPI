var mongoose = require('mongoose');
var Model = require('../../model');

var Vendor = Model.vendorSchema;

module.exports.profileRead = function(req, res) {

	if (!req.payload._id) {
		res.status(401).json({
			"message" : "UnauthorizedError: private profile"
		});
	} else {
		Vendor
			.findById(req.payload._id)
			.exec(function(err, vendor) {
				res.status(200).json(vendor);
			});
	}

};