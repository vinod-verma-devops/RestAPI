var AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname+'/'+'../../../app/config/aws.json');

var fs = require('fs');

module.exports.create = function(req, res) {
	var file = req.files.file;
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
};


/*
module.exports.delete = function(req, res) {

	var params = {
		Bucket: "rentwisebucket",
		Key: "file1.png"
	};
	s3bucket.deleteObject(params, function(err, data) {
	  if (err) console.log(err, err.stack); 
	  else     console.log(data);  
	});
};*/