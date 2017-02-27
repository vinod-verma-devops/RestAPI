var Model = require('./model');

module.exports.linkUser = function(req, res) {
	var user = new Model.userModel();
	
	user._id = 23;
	user.name = 'Joe'; // req.body.title;
	user.save(function(err) {
		if (err) {
			console.log('ERROR MSG: ', err);
			res.status(500).send(err);
		} else {
			res.status(200);
			res.json({
				"message" : "Successfully created user"
			});
		}
		/*var product1 = new Model.productModel();
		product1.title = 'Bulu Box Original';
		product1._vendor = vendor._id
		product1.save(function (err) {
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
		vendor.products.push(product1);
		vendor.save(callback);*/
	});

};

module.exports.linkProduct = function(req, res) {
	var vendor = new Model.vendorModel();
	
	vendor._id = 103;
	vendor.name = 'Try'; // req.body.title;
	vendor.save(function(err) {
		if (err) {
			console.log('ERROR MSG: ', err);
			res.status(500).send(err);
		} else {
			res.status(200);
			res.json({
				"message" : "Successfully created vendor"
			});
		}
		/*var product1 = new Model.productModel();
		product1.title = 'Bulu Box Original';
		product1._vendor = vendor._id
		product1.save(function (err) {
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
		vendor.products.push(product1);
		vendor.save(callback);*/
	});

};

module.exports.addProduct = function(req, res) {
	
	var Vendor = Model.vendorModel;
	
	var id = 102; //req.params.product_id
	
	Vendor
	.findById(id)
	.exec(function(err, vendor) {
		if (err) {
			console.log('ERROR MSG: ', err);
			res.status(500).send(err);
		}	
		vendor.name='Glossy';
		vendor.save(function(err, callback) {
			if (err) {
				console.log('ERROR MSG: ', err);
				res.status(500).send(err);
			}
			
			//res.send(callback);
			
			var product = new Model.productModel();
			product.title = 'Glossybox Supreme';
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
				/*
				var Product = new Model.productModel;
				var pid = "58b3f0b4539c49765ea37e01";
				Product
				.findById(pid)
				.exec(function(err, product) {
					if (err) {
						console.log('ERROR MSG: ', err);
						res.status(500).send(err);
					}	
					product.orders.push(order);
				});*/
			});
			
		});
		
		
	});
	
};


module.exports.viewProduct = function(req, res) {
	
	var Product = Model.productModel;
	
	Product
	.findOne({title: 'Glossybox Original'})
	.populate('_vendor')
	.exec(function(err, product) {
		if (err) {
			console.log('ERROR MSG: ', err);
			res.status(500).send(err);
		};
		console.log('The vendor is %s', product._vendor.name);
		res.status(200).json(product);
	});
	
};

module.exports.viewOrder = function(req, res) {
	
	/*var User = Model.userModel;
	
	var id = 23; //req.params.product_id
	
	User
	.findById(id)
	.populate('orders')
	.exec(function(err, user) {
		if (err) {
			console.log('ERROR MSG: ', err);
			res.status(500).send(err);
		};
		res.status(200).json(user);
	});*/
	
	/*var Order = Model.orderModel;
	
	var id = "58b3fc09d4ba307a05179a47";
	Order
	.findById(id)
	.populate('_user')
	.exec(function(err, order) {
		if (err) {
			console.log('ERROR MSG: ', err);
			res.status(500).send(err);
		};
		res.status(200).json(order);
	});*/

	var Vendor = Model.vendorModel;
	
	var id = 102;
	Vendor
	.findById(id)
	.populate('products')
	.exec(function(err, vendor) {
		if (err) {
			console.log('ERROR MSG: ', err);
			res.status(500).send(err);
		};
		console.log(vendor.products);
		res.status(200).json(vendor);
	});
	
};
	
	