'use strict';

var mongoose = require('mongoose'),
	Tenant = mongoose.model('Tenant');

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
	console.log(Date.now()+' - Entered in "updateTenant". The request QS is:\n' + req.body);
	
	var tenantToUpdate = new Tenant(req.body);
	
	console.log(Date.now()+' - Try to update the Tenant');
	
	Tenant.findOneAndUpdate({emailAddress: req.body.emailAddress}, 
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

exports.retrieveTenant = function(req, res){
	console.log(Date.now()+' - Entered in "retrieveTenant". The request QS is:\n' + req.query);
	console.log(Date.now()+' - Request parametes are:\n - ' + req.query._id);
	
	Tenant.findById(req.query._id,
		function(err, tenant) {
			console.log(Date.now()+' - Error: '+err+'\tTenant: '+tenant);
			if(!err){
				if(tenant != null){
					console.log(Date.now()+' - Tenant found.');
					res.json(tenant);
				}
				else{
					console.log(Date.now()+' - Returned object "tenant" is null');
					res.json({"Error":'Returned object "tenant" is null'});
				}
			}
			else{
				console.log(Date.now()+' - Error during the "findOne" operation:\n'+err);
				res.send(err);
			}
		}
	);
	console.log(Date.now()+' - Exit from "retrieveTenant"');
};