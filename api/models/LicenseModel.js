'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var ObjectId = mongoose.Schema.Types.ObjectId;
const uuidv5 = require('uuid/v5');

var LicenseSchema = new Schema({
	condominiumID : {
		type: ObjectId,
		required: 'Enter condominiumID'
		},
	tenantID : {
		type: ObjectId,
		required: 'Enter tenantID'
		},
	validUntilDate : {
		type: Date,
		required: 'Enter the validity date'
		},
	isActive: {
		type: Boolean
		},
	licenseUUID: {
		type: String
		}
});

LicenseSchema.methods.setLicenseID = function(){
	const namespace = process.env.HASHED_NAMESPACE;
	this.licenseUUID = uuidv5(""+this.condominiumID+this.tenantID+this.validUntilDate, namespace);
};

LicenseSchema.methods.checkLicense = function(){
	return this.validUntilDate >= Date.now();
};

module.exports = mongoose.model('License', LicenseSchema);