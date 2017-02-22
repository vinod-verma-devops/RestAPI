// Import MongoDB
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// Defining the user schema
var ProductSchema   = new Schema({
	title: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
    description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	frequency: {
		type: String,
		required: true
	},
	age: {
		type: String,
		required: true
	},
	note: {
		type: String,
	},
	__v: {type: Number, select: false}
});

module.exports = mongoose.model('Product', ProductSchema);