'use strict';
module.exports = function(app) {
	var totr = require('../controllers/totrController');
	
	app.route('/totr/admin/register')
		.post(totr.register);
	
	app.route('/totr/admin/login')
		.post(totr.login);
		
	app.route('/totr/admin/addTenant')
		.post(totr.addTenant);
		
	app.route('/totr/admin/updateTenant')
		.post(totr.updateTenant);
		
	app.route('/totr/admin/removeTenant')
		.post(totr.removeTenant);
		
	/*
	app.route('/totr/admin/:myMethod')
		.post(totr[mymethod);
	*/
};