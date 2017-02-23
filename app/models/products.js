// Import MongoDB
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Images = new Schema({
    kind: { 
        type: String, 
        enum: ['thumbnail', 'main', 'sub1', 'sub2'],
        required: true
    },
    url: {
	    type: String,
	    required: true
	}
});

var Categories = new Schema({
    name: String
});

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
	images: [Images],
    categories: [Categories],
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
	modified: { 
		type: Date,
		default: Date.now
	},
	__v: {type: Number, select: false}
});


module.exports = mongoose.model('Product', ProductSchema);