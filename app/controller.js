/*var Model = require('./model');

module.exports.linkProduct = function(req, res) {
	var vendor = new Model.vendorModel();
	
	vendor._id = 101;
	vendor.name = 'Bulu'; // req.body.title;
	vendor.save(function(err, callback) {
		if (err) {
			console.log('ERROR MSG: ', err);
			res.status(500).send(err);
		};
		
		var product1 = new Model.productModel();
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
		vendor.save(callback);
	});

};


module.exports.viewProduct = function(req, res) {
	
	var Product = Model.productModel;
	
	Product
	.findOne({title: 'Bulu Box Original'})
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
	*/
	