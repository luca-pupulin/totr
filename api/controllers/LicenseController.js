'use strict';

var mongoose = require('mongoose'),
	License = mongoose.model('License');

exports.addLicense = function(req, res){
	console.log(Date.now()+' - Entered in "addLicense". The request body is:\n' + req.body);

	var new_License = new License(req.body);
	
	console.log(Date.now()+' - Try to save the new License biult from req.body');
	new_License.save(function(err, createdLicense){		
		if(err){
			console.log(Date.now()+' - Error during the "save" operation:\n'+err);
			res.send(err);
		}
		else{
			console.log(Date.now()+' - License correctly saved. Here follows details:\n'+createdLicense);
			//TODO:			
			//Aggiornare il Tenant
			createdLicense.setLicenseID();
			createdLicense.save().exec();			
			res.json(createdLicense);
		}
	});
	console.log(Date.now()+' - Exit from "addTenant"');
};