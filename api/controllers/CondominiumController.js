'use strict';

var mongoose = require('mongoose'),
	Condominium = mongoose.model('Condominium');

exports.createCondominium = function(req,res){
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

exports.retrieveCondominium = function(req, res){
	console.log(Date.now()+' - Entered in "retrieveCondominium". The request body is:\n' + req.query);
	console.log(Date.now()+' - Request parametes are:\n - ' + req.query._id);
	
	Condominium.findById(req.query._id,
		function(err, condominium) {
			console.log(Date.now()+' - Error: '+err+'\tCondominium: '+condominium);
			if(!err){
				if(condominium != null){
					console.log(Date.now()+' - Condominium found.');
					res.json(condominium);
				}
				else{
					console.log(Date.now()+' - Returned object "condominium" is null');
					res.json({"Error":'Returned object "condominium" is null'});
				}
			}
			else{
				console.log(Date.now()+' - Error during the "findOne" operation:\n'+err);
				res.send(err);
			}
		}
	);
	console.log(Date.now()+' - Exit from "retrieveCondominium"');
};