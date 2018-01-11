'use strict';

var mongoose = require('mongoose'),
	License = mongoose.model('License'),
	qrCode = require('qrcode-npm');

exports.addLicense = function(req, res){
	console.log(Date.now()+' - Entered in "addLicense". The request body is:\n' + req.body);

	var new_License = new License(req.body);
	new_License.setLicenseID();
	
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
			res.json(createdLicense);
		}
	});
	console.log(Date.now()+' - Exit from "addLicense"');
};

exports.getQRCode = function(req, res){
	console.log(Date.now()+' - Entered in "getQRCode". The request body is:\n' + req.body);
	res.writeHead(200, {'Content-Type': 'text/plain'});
    console.log(Date.now()+' - Header set');
	console.log(Date.now()+' - License key read from queryString: '+req.query.licenseKey);
	var qr = qrCode.qrcode(4, 'M');
	qr.addData(req.query.licenseKey);
	qr.make();

	res.write(qr.createImgTag(4));
	res.write();
	res.write(qr.createTableTag(4));
	res.end();
	console.log(Date.now()+' - Exit from "addLicense"');
};