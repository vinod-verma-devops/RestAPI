var AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname+'/'+'../../../app/config/aws.json');
var fs = require('fs');

// Import Products.js
var Model = require('../../../app/models/products');

var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

function iterate(req, res, index) {
	var image = new Model.ImageModel();
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
	
	for (var i = 0; i < req.files.file.length; i++) {
		product.images.push(iterate(req.files.file[0], res, i));
	}
	
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