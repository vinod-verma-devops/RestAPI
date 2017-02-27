// Import Mongoose Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vendorSchema = new Schema({
	_id: {
		type: Number
	},
	name: {
		type: String,
	},
	products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
});

var productSchema = new Schema({
	_vendor: {
		type: Number,
		ref: 'Vendor'
	},
	title: {
		type: String
	},
	orders: [{type: Schema.Types.ObjectId, ref: 'Order'}]
});

var orderSchema = new Schema({
	_user: {
		type: Number,
		ref: 'User'
	},
	product: {type: Schema.Types.ObjectId, ref: 'Product'}
});

var userSchema = new Schema({
	_id: {
		type: Number
	},
	name: {
		type: String,
	},
	orders: [{type: Schema.Types.ObjectId, ref: 'Order'}]
});

var Vendor = mongoose.model('Vendor', vendorSchema);
var Product = mongoose.model('Product', productSchema);
var Order = mongoose.model('Order', orderSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
	vendorModel: Vendor,
	productModel: Product,
	orderModel: Order,
	userModel: User
};