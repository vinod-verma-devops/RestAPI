// Import Products.js
var Model = require('../../../app/models/products');

var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.create = function(req, res) {
	
	var product = new Model.ProductModel();
	
	product.title = req.body.title;
	product.location = req.body.location;
	product.description = req.body.description;
    product.category = req.body.category;
	product.price = req.body.price;
	product.frequency = req.body.frequency;
	product.age = req.body.age;
	product.note = req.body.note;

	
	product.save(function(err) {
		if (err) {
			console.log('ERROR MSG: ', err);
			res.status(500).send(err);
		} else {
			res.status(200);
			res.json({
				"message" : "Successfully created product"
			});
		}
	});
};