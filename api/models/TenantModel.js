'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


var TenantSchema = new Schema({
  name: {
	type: String,
    required: 'Please enter the name'
  },
  flatName: {
	type: String,
    required: 'Please enter the Flat Name'
  },
  flatNumber: {
	type: Number,
    required: 'Please enter the Flat Number'
  },
  emailAddress: {
	type: String,
	required: 'Please enter the email address',
	unique: true
  },
  licenses:{
	type:[]  
  }
});

module.exports = mongoose.model('Tenant', TenantSchema);