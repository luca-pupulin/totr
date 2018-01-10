'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
const uuidv5 = require('uuid/v5');

var LicenseSchema = new Schema({
	condominiumID : {
		type: Schema.Types.ObjectID,
		required: 'Enter condominiumID',
		unique: true
		},
	tenantID : {
		type: Schema.Types.ObjectID,
		required: 'Enter tenantID',
		unique: true
		},
	validUntilDate : {
		type: Date,
		required: 'Enter the validity date',
		unique: true
		},
	isActive: {
		type: Boolean
		},
	licenseUUID: {
		type: String
		}
});

LicenseSchema.methods.setLicenseID = function(){
	const namespace = process.env.hashed_namespace;
	this.licenseUUID = uuidv5(""+this.condominiumID+this.tenantID+this.validUntilDate, namespace);
};

LicenseSchema.methods.checkLicense = function(){
	return this.validUntilDate >= Date.now();
};

module.exports = mongoose.model('License', LicenseSchema);