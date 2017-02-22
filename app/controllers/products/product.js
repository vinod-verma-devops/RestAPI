// Import Products.js
var Product = require('../../../app/models/products');

var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.create = function(req, res) {
	
	var product = new Product();
	
	product.title = req.body.title;
	product.location = req.body.location;
	product.description = req.body.description;
	images = req.body.images;
    categories = req.body.categories;
	product.price = req.body.price;
	product.frequency = req.body.frequency;
	product.age = req.body.age;
	product.note = req.body.note;

	
	product.save(function(err) {
		res.status(200);
		res.json({
			"message" : "Successfully created product"
		});
	});
};