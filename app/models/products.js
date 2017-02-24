// Import MongoDB
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ImageSchema = new Schema({
    kind: { 
        type: String, 
        /*enum: ['thumbnail', 'main', 'sub1', 'sub2'],*/
        required: true
    },
    url: {
	    type: String,
	    required: true
	}
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
	images: [ImageSchema],
    category: {
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
	modified: { 
		type: Date,
		default: Date.now
	},
	__v: {type: Number, select: false}
});

var ImageModel = mongoose.model('Image', ImageSchema);
var ProductModel = mongoose.model('Product', ProductSchema);

module.exports = {
	ImageModel: ImageModel,
	ProductModel: ProductModel
};