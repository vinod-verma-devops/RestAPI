// Import MongoDB
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// Password Authentication & Encryption
var crypto       = require('crypto');
var jwt 		 = require('jsonwebtoken');

// Defining the user schema
var UserSchema   = new Schema({
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
	__v: {type: Number, select: false}
});

/** User Schema Methods **/
UserSchema.methods.generateJwt = function() {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);
	
	return jwt.sign({
		_id: this._id,
		email: this.email,
		name: this.name,
		exp: parseInt(expiry.getTime() / 1000),
	}, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

UserSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
	return this.hash === hash;
};

module.exports = mongoose.model('User', UserSchema);