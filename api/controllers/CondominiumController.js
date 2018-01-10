'use strict';

var mongoose = require('mongoose'),
	Condominium = mongoose.model('Condominium');

exports.create = function(req,res){
	console.log(Date.now()+' - Entered in "Create". The request body is:\n' + req.body);
	var new_Condominium = new Condominium(req.body);
	
	console.log(Date.now()+' - Try to save the new Condominium biult from req.body');
	new_Condominium.save(function(err,createdCondominium){		
		if(err){
			console.log(Date.now()+' - Error during the "save" operation:\n'+err);
			res.send(err);
		}
		else{
			console.log(Date.now()+' - Condominium correctly saved.Here follows details:\n'+createdCondominium);
			res.json(createdCondominium);
		}
	});
	console.log(Date.now()+' - Exit from "create"');
};

exports.updateCondominium = function(req, res){
	console.log(Date.now()+' - Entered in "updateCondominium". The request body is:\n' + req.body);
	
	var condominiumToUpdate = new Condominium(req.body);
	
	console.log(Date.now()+' - Try to update the Condominium');
	
	Condominium.findOneAndUpdate({_id: req.body._id}, 
							condominiumToUpdate, 
							{new: false, upsert: true, setDefaultsOnInsert: true}, 
							function(err, updatedCondominium){
		if(err){
			console.log(Date.now()+' - Error during the "update" operation:\n'+err);
			res.send(err);
		}
		else{
			console.log(Date.now()+' - Condominium correctly updated');
			res.json(updatedCondominium);			
		}
	});
	console.log(Date.now()+' - Exit from "updateCondominium"');
};