'use strict';

var mongoose = require('mongoose'),
	Administrator = mongoose.model('Administrator');

exports.register = function(req,res){
	console.log(Date.now()+' - Entered in "Register". The request body is:\n' + req.body);
	var new_Administrator = new Administrator(req.body);
	
	console.log(Date.now()+' - Try to save the new Administrator biult from req.body');
	new_Administrator.save(function(err,createdAdministrator){		
		if(err){
			console.log(Date.now()+' - Error during the "save" operation:\n'+err);
			res.send(err);
		}
		else{
			console.log(Date.now()+' - Administrator correctly saved.Here follows details:\n'+createdAdministrator);
			res.json(createdAdministrator);
		}
	});
	console.log(Date.now()+' - Exit from "Register"');
};

exports.updateAdministrator = function(req, res){
	console.log(Date.now()+' - Entered in "updateAdministrator". The request body is:\n' + req.body);
	
	var administratorToUpdate = new Administrator(req.body);
	
	console.log(Date.now()+' - Try to update the Administrator');
	
	Administrator.findOneAndUpdate({emailAddress: req.body.emailAddress}, 
							administratorToUpdate, 
							{new: false, upsert: true, setDefaultsOnInsert: true}, 
							function(err, updatedAdmin){
		if(err){
			console.log(Date.now()+' - Error during the "update" operation:\n'+err);
			res.send(err);
		}
		else{
			console.log(Date.now()+' - Administrator correctly updated');
			res.json(updatedAdmin);			
		}
	});
	console.log(Date.now()+' - Exit from "updateAdministrator"');
};

exports.login = function(req, res){
	console.log(Date.now()+' - Entered in "Login". The request body is:\n' + req.body);
	console.log(Date.now()+' - Request parametes are:\n - ' + req.body.emailAddress+'\n - ' + req.body.password);
	
	Administrator.findOne({emailAddress: req.body.emailAddress},
		function(err, administrator) {
			console.log(Date.now()+' - Error: '+err+'\tadministrator: '+administrator);
			if(!err){
				if(administrator != null){
					if (!administrator.validPassword(req.body.password)) {
						console.log(Date.now()+' - Administrator found but password do not match');
						res.json({"Error":"Password do not match"});
					}
					else {
						console.log(Date.now()+' - Passwords match');
						res.json({"Redirect":"MainPage","Administrator":administrator});
					}
				}
				else{
					console.log(Date.now()+' - Returned object "administrator" is null');
					res.json({"Error":'Returned object "administrator" is null'});
				}
			}
			else{
				console.log(Date.now()+' - Error during the "findOne" operation:\n'+err);
				res.send(err);
			}
		}
	);
	console.log(Date.now()+' - Exit from "Login"');
};
