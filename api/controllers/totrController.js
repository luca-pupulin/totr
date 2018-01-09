'use strict';

var mongoose = require('mongoose'),
	Administrator = mongoose.model('Administrator');

exports.register = function(req,res){
	var new_Administrator = new Administrator(req.body);
	
	Administrator.save(function(err,new_Administrator){
		if(err)
			res.send(err);
		res.json(new_Administrator);
	});
};

exports.login = function(req, res){
	Administrator.findOne({emailAddress: req.body.emailAddress}, function(err, administrator) {

    if (!administrator.validPassword(req.body.password)) {
      res.end({"Error":"Password do not match"});
    } else {
      res.end({"Redirect":"MainPage"});
    }
  });
};