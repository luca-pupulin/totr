'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


var AdministratorSchema = new Schema({
  name: {
    type: String,
    required: 'Please enter the name'
  },
  surname: {
	type: String,
    required: 'Please enter the second name'
	},
  fiscalNumber: {
	type: String,
    required: 'Kindly enter the Fiscal Identifier'
  },
  emailAddress: {
	type: String,
    required: 'Kindly enter a valid email address',
	unique: true
  },
  password: {
	type: String,
    required: 'Kindly enter password',
	set: v => bcrypt.hashSync(v, bcrypt.genSaltSync(8), null)
  },
  administeredCondominiums: {
	type: [{}]
  }
});


// checking if password is valid
AdministratorSchema.methods.validPassword = function(password) {
  console.log("Checking passwords for: "+this.emailAddress);
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Administrator', AdministratorSchema);