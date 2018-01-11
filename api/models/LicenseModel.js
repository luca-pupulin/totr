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
	console.log(Date.now()+' - HashedNamespace retrieved:\n'+namespace);
	var toBeHashed = ""+this.condominiumID+this.tenantID+this.validUntilDate;
	console.log(Date.now()+' - String to be hashed built:\n'+toBeHashed);
	var generated_uuid = uuidv5(toBeHashed, namespace);
	this.licenseUUID = generated_uuid;
	console.log(Date.now()+' - Generated UUID:\n'+generated_uuid+"\n"+this.licenseUUID);
};

LicenseSchema.methods.checkLicense = function(){
	return this.validUntilDate >= Date.now();
};

module.exports = mongoose.model('License', LicenseSchema);