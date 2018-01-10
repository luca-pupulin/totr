'use strict';

var mongoose = require('mongoose'),
	Administrator = mongoose.model('Administrator');

exports.register = function(req,res){
	console.log('Entered in "Register". The request body is:\n' + req.body);
	var new_Administrator = new Administrator(req.body);
	
	console.log('Try to save the new Administrator biult from req.body');
	new_Administrator.save(function(err){		
		if(err){
			console.log('Error during the "save" operation:\n'+err);
			res.send(err);
		}
		else{
			console.log('Administrator correctly saved.Here follows details:\n'+this);
			res.json(this);
		}
	});
	console.log('Exit from "Register"');
};

exports.login = function(req, res){
	console.log('Entered in "Login". The request body is:\n' + req.body);
	console.log('Request parametes are:\n - ' + req.body.emailAddress+'\n - ' + req.body.password);
	
	Administrator.findOne({emailAddress: req.body.emailAddress},
		function(err, administrator) {
			if(!err)
				if (!administrator.validPassword(req.body.password)) {
					console.log('Administrator found but password do not match');
					res.json({"Error":"Password do not match"});
				}
				else {
					console.log('Passwords match');
					res.json({"Redirect":"MainPage","Administrator":administrator});
				}
			else{
				console.log('Error during the "findOne" operation:\n'+err);
				res.send(err);
			}
		}
	);
	console.log('Exit from "Login"');
};

exports.fake_login = function(req, res){
	console.log('Entered in "Fake Login". The request body is:\n' + req.body);
	console.log('Request parametes are:\n - ' + req.body.emailAddress+'\n - ' + req.body.password);
	
	Administrator.findOne({emailAddress: req.body.emailAddress}, function(err, administrator) {
		if(!err)
			if (administrator.password != req.body.password)) {
				console.log('Administrator found but password do not match');
				res.json({"Error":"Password do not match"});
			}
			else {
				console.log('Passwords match');
				res.json({"Redirect":"MainPage","Administrator":administrator});
			}
		else{
			console.log('Error during the "findOne" operation:\n'+err);
			res.send(err);
		}
	});
	console.log('Exit from "Fake Login"');
};