'use strict';

var mongoose = require('mongoose'),
	Administrator = mongoose.model('Administrator'),
	Tenant = mongoose.model('Tenant');

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

exports.addTenant = function(req, res){
	console.log(Date.now()+' - Entered in "addTenant". The request body is:\n' + req.body);

	var new_Teant = new Tenant(req.body);
	
	console.log(Date.now()+' - Try to save the new Tenant biult from req.body');
	new_Teant.save(function(err, createdTenant){		
		if(err){
			console.log(Date.now()+' - Error during the "save" operation:\n'+err);
			res.send(err);
		}
		else{
			console.log(Date.now()+' - Tenant correctly saved.Here follows details:\n'+createdTenant);
			res.json(createdTenant);
		}
	});
	console.log(Date.now()+' - Exit from "addTenant"');
};

exports.removeTenant = function(req, res){
	console.log(Date.now()+' - Entered in "removeTenant". The request body is:\n' + req.body);
	console.log(Date.now()+' - Request parametes are:\n - ' + req.body.emailAddress);
	
	console.log(Date.now()+' - Try to remove the Tenant');
	Tenant.remove({emailAddress: req.body.emailAddress}, function(err, tenant){		
		if(err){
			console.log(Date.now()+' - Error during the "remove" operation:\n'+err);
			res.send(err);
		}
		else{
			console.log(Date.now()+' - Tenant correctly removed');
			Tenant.findById(tenant._id, function (err, removedTenant) {
				if(!removedTenant)
					res.json({"result":"deleted"});
				else
					res.json({"result":err,"tenant":removedTenant});
			});			
		}
	});
	console.log(Date.now()+' - Exit from "removeTenant"');
};

exports.updateTenant = function(req, res){
	console.log(Date.now()+' - Entered in "updateTenant". The request body is:\n' + req.body);
	
	var tenantToUpdate = new Tenant(req.body);
	
	console.log(Date.now()+' - Try to update the Tenant');
	
	Tenant.findOneAndUpdate({_id: tenantToUpdate._id}, 
							tenantToUpdate, 
							{new: false, upsert: true, setDefaultsOnInsert: true}, 
							function(err, updatedTenant){
		if(err){
			console.log(Date.now()+' - Error during the "update" operation:\n'+err);
			res.send(err);
		}
		else{
			console.log(Date.now()+' - Tenant correctly updated');
			res.json(updatedTenant);			
		}
	});
	console.log(Date.now()+' - Exit from "updateTenant"');
};


