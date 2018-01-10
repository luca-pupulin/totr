'use strict';
module.exports = function(app) {
	var administratorController = require('../controllers/AdministratorController');
	var tenantController = require('../controllers/TenantController');
	var condominiumController = require('../controllers/CondominiumController');
	
	app.route('/totr/admin/register')
		.post(administratorController.register);
	
	app.route('/totr/admin/update')
		.post(administratorController.updateAdministrator);
	
	app.route('/totr/admin/login')
		.post(administratorController.login);
		
	app.route('/totr/tenant/add')
		.post(tenantController.addTenant);
		
	app.route('/totr/tenant/update')
		.post(tenantController.updateTenant);
		
	app.route('/totr/tenant/remove')
		.post(tenantController.removeTenant);
		
	/*
	app.route('/totr/admin/:myMethod')
		.post(totr[mymethod);
	*/
};