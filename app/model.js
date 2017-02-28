// Import Mongoose Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var vendorSchema = new Schema({
	_id: {
		type: Number
	},
	name: {
		type: String,
		required: true
	},
    email: {
		type: String,
		unique: true,
		required: true
	},
	username: {
		type: String,
		unique: true,
		required: true
	},
	hash: String,
	salt: String,
	products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
});

var imageSchema = new Schema({
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

var productSchema = new Schema({
	_vendor: {
		type: Number,
		ref: 'Vendor'
	},
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
	images: [imageSchema],
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
	orders: [{type: Schema.Types.ObjectId, ref: 'Order'}]
});

var orderSchema = new Schema({
	_user: {
		type: Number,
		ref: 'User'
	},
	fulfilled: {
		type: Number
	},
	product: {type: Schema.Types.ObjectId, ref: 'Product'}
});

var userSchema = new Schema({
	_id: {
		type: Number
	},
	name: {
		type: String,
		required: true
	},
    email: {
		type: String,
		unique: true,
		required: true
	},
	hash: String,
	salt: String,
	orders: [{type: Schema.Types.ObjectId, ref: 'Order'}]
});

userSchema.methods.generateJwt = function() {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);
	
	return jwt.sign({
		_id: this._id,
		email: this.email,
		name: this.name,
		exp: parseInt(expiry.getTime() / 1000),
	}, "mdfkldfgkl&*(sas/d,asldsjf()*)(mlksdmfNfjSDsdfYUHNn");
};

userSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

userSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
	return this.hash === hash;
};

vendorSchema.methods.generateJwt = function() {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);
	
	return jwt.sign({
		_id: this._id,
		email: this.email,
		name: this.name,
		exp: parseInt(expiry.getTime() / 1000),
	}, "mdfkldfgkl&*(sas/d,asldsjf()*)(mlksdmfNfjSDsdfYUHNn"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

vendorSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

vendorSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
	return this.hash === hash;
};

productSchema.path('description').validate(function(txt) {
    console.log("validate description");
    console.log(txt);
    return txt.length > 10;
}, 'Product description should be more than 10 characters');

var Vendor = mongoose.model('Vendor', vendorSchema);
var Image = mongoose.model('Image', imageSchema);
var Product = mongoose.model('Product', productSchema);
var Order = mongoose.model('Order', orderSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
	vendorModel: Vendor,
	imageModel: Image,
	productModel: Product,
	orderModel: Order,
	userModel: User
};