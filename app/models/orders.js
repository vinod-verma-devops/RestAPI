/*var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = require('./products');
var UserSchema = require('./users');
var VendorSchema = require('./vendors');

var OrderSchema = new Schema({
	user: String,
	product: { type: Schema.Types.ObjectId, ref: 'ProductSchema' }
});

module.exports = mongoose.model('Order', OrderSchema);*/

/*Order.find({}).populate('products.product').exec(function(err, orders) {
	console.log();
});*/
