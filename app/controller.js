var AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname+'/'+'./config/aws.json');
var fs = require('fs');

var passport = require('passport');
var mongoose = require('mongoose');

var Model = require('./model');

module.exports.registerUser = function(req, res) {
	
	var user = new Model.userModel();
	
	//user._id = 11;
	user.name = req.body.name;
	user.email = req.body.email.toLowerCase();
	
	user.setPassword(req.body.password);
	
	user.save(function(err) {
		if (err) {
			console.log('ERROR MSG: ', err);
			res.status(500).send(err);
		} else {
			var token;
			token = user.generateJwt();
			res.status(200);
			res.json({
				"token" : token
			});
		}
	});
};

module.exports.loginUser = function(req, res) {
	
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

module.exports.registerVendor = function(req, res) {
	
	var vendor = new Model.vendorModel();
	
	//vendor._id = 103;
	vendor.name = req.body.name;
	vendor.email = req.body.email.toLowerCase();
	vendor.username = req.body.username.toLowerCase();
	
	vendor.setPassword(req.body.password);
	
	vendor.save(function(err) {
		if (err) {
			console.log('ERROR MSG: ', err);
			res.status(500).send(err);
		} else {
			var token;
			token = vendor.generateJwt();
			res.status(200);
			res.json({
				"token" : token
			});
		}
	});
};

module.exports.loginVendor = function(req, res) {
	
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

module.exports.profileUser = function(req, res) {
	
	var User = Model.userModel;
	
	if (!req.payload._id) {
		
		res.status(401).json({
			"message" : "UnauthorizedError: private profile"
		});
		
	} else {
		User
			.findById(req.payload._id)
			.exec(function(err, user) {
				res.status(200).json(user);
			});
	}
};

module.exports.profileVendor = function(req, res) {
	
	var Vendor = Model.vendorModel;
	
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

function iterate(req, res, index) {
	var image = new Model.imageModel();
	image.kind = image.schema.path('kind').enumValues[index];
	var file = req;
	var ext = file.originalFilename.split('.').pop();
	function randomString(length, chars) {
		var result = '';
		for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
			return result;
	}
	var rString = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
	file.originalFilename = rString + '.' + ext;
	image.url = file.originalFilename;
	fs.readFile(file.path, function (err, data) {
		if (err) throw err;
		var s3bucket = new AWS.S3({
			params: {
				Bucket: 'rentwisebucket'
			}
		});
		s3bucket.createBucket(function () {

			var params = {
				Key: file.originalFilename,
				Body: data
			};
			s3bucket.upload(params, function (err, data) {
				fs.unlink(file.path, function (err) {
					if (err) {
						console.error(err);
					}
					console.log('Temp File Delete');
				});
		
				console.log("PRINT FILE:", file);
				if (err) {
					console.log('ERROR MSG: ', err);
					res.status(500).send(err);
				} else {
					console.log('Successfully uploaded data');
					res.status(200).end();
				}
			});
		});
	});
	return image;
}

module.exports.addProduct = function(req, res) {
	
	var Vendor = Model.vendorModel;
	
	if (!req.payload._id) {
		
		res.status(401).json({
			"message" : "Must be logged in as a vendor to add product."
		});
		
	} else {
		
		Vendor
		.findById(req.payload._id)
		.exec(function(err, vendor) {
			if (err) {
				console.log('ERROR MSG: ', err);
				res.status(500).send(err);
			}	
			
			vendor.save(function(err, callback) {
				if (err) {
					console.log('ERROR MSG: ', err);
					res.status(500).send(err);
				}
				
				var product = new Model.productModel();
				
				product.title = req.body.title;
				product.location = req.body.location;
				product.description = req.body.description;
			    product.category = req.body.category;
				product.price = req.body.price;
				product.frequency = req.body.frequency;
				product.age = req.body.age;
				product.note = req.body.note;
				
				for (var i = 0; i < req.files.file.length; i++) {
					product.images.push(iterate(req.files.file[i], res, i));
				}
				
				product._vendor = vendor._id
				product.save(function (err) {
					if (err) {
						console.log('ERROR MSG: ', err);
						res.status(500).send(err);
					}  else {
						res.status(200);
						res.json({
							"message" : "Successfully created product"
						});
					}
				});
				vendor.products.push(product);
				vendor.save(callback);
			});
			
			
		});
	};
	
};

module.exports.addOrder = function(req, res) {
	
	var User = Model.userModel;
	
	var id = 23; //req.params.product_id
	
	User
	.findById(id)
	.exec(function(err, user) {
		if (err) {
			console.log('ERROR MSG: ', err);
			res.status(500).send(err);
		}	
		//user.name='John';
		user.save(function(err, callback) {
			if (err) {
				console.log('ERROR MSG: ', err);
				res.status(500).send(err);
			}
			
			//res.send(callback);
			
			var Product = Model.productModel;
	
			Product
			.findOne({title: 'Glossybox Original'})
			.exec(function(err, product) {
			
				product.save(function(err, callback) {
					
					var order = new Model.orderModel();
					order._user = user._id;
					order.product = product;
					order.save(function (err) {
						if (err) {
							console.log('ERROR MSG: ', err);
							res.status(500).send(err);
						}  else {
							res.status(200);
							res.json({
								"message" : "Successfully created order"
							});
						}
					});
					
					product.orders.push(order);
					product.save(callback);
				
					user.orders.push(order);
					user.save(callback);
					
				});
				
			});
			
		});
		
		
	});
	
};


module.exports.viewProduct = function(req, res) {
	
	var Product = Model.productModel;
	
	var id = '58b3f0b4539c49765ea37e01';
	
	Product
	.findById(id)
	.populate({path: 'orders', model: Model.orderModel, populate: {path: '_user', model: Model.userModel}})
	.exec(function(err, product) {
		if (err) {
			console.log('ERROR MSG: ', err);
			res.status(500).send(err);
		};
		res.status(200).json(product);
	});
	
};

module.exports.viewOrder = function(req, res) {

	var Vendor = Model.vendorModel;
	
	var id = 102;
	Vendor
	.findById(id)
	.select('products')
	.populate({path: 'products', model: Model.productModel, populate: {path: 'orders', model: Model.orderModel, populate: {path: '_user', model: Model.userModel, select: 'name'}}})
	.exec(function(err, vendor) {
		if (err) {
			console.log('ERROR MSG: ', err);
			res.status(500).send(err);
		};
		//console.log(vendor.products);
		res.status(200).json(vendor);
	});
	
};
	
	