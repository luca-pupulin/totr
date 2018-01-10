'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var CondominiumSchema = new Schema({
  name: {
	type: String,
    required: 'Please enter the name',
	unique: true
  },
  address: {
	type: String,
    required: 'Please enter the condominium address'
  },
  numberOfFlats: {
	type: Number,
	min: 4,
	required: 'Please enter numer of flats'
  },
  algorithmConfiguration: {type: [String]}
});

module.exports = mongoose.model('Condominium', CondominiumSchema);