'use strict';

var mongoose = require('mongoose'),
	Administrator = mongoose.model('Administrator');

exports.register = function(req,res){
	var new_Administrator = new Administrator(req.body);
	
	new_Administrator.save(function(err){
		if(err)
			res.send(err);
		else
			res.json(this);
	});
};

exports.login = function(req, res){
	Administrator.findOne({emailAddress: req.body.emailAddress}, function(err, administrator) {

    if (!administrator.validPassword(req.body.password)) {
      res.json({"Error":"Password do not match"});
    } else {
      res.json({"Redirect":"MainPage"});
    }
  });
};

exports.fake_login = function(req, res){
	Administrator.findOne({emailAddress: req.body.emailAddress}, function(err, administrator) {
		if (req.body.password != administrator.password) {
		  res.json({"Error":"Password do not match"});
		} else {
		  res.json({"Redirect":"MainPage"});
		}
  });
};