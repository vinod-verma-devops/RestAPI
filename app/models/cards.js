// Import MongoDB
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// Defining the user schema
var CardSchema   = new Schema({
	title: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	__v: {type: Number, select: false}
});

module.exports = mongoose.model('Card', CardSchema);