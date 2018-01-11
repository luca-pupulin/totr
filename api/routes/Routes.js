'use strict';
module.exports = function(app) {
	var administratorController = require('../controllers/AdministratorController');
	var tenantController = require('../controllers/TenantController');
	var condominiumController = require('../controllers/CondominiumController');
	var licenseController = require('../controllers/LicenseController');
	
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
	
	app.route('/totr/condominium/create')
		.post(condominiumController.createCondominium);
		
	app.route('/totr/condominium/update')
		.post(condominiumController.updateCondominium);
		
	app.route('/totr/license/create')
		.post(licenseController.addLicense);
		
	app.route('/totr/license/getMyCode')
		.get(licenseController.getQRCode);
		
	app.get("/",function(req, res){
		res.json({"Page":"not found"});
	});
	
	app.post("/",function(req, res){
		res.json({"Functionality":"not found"});
	});
	
	/*
	app.route('/totr/admin/:myMethod')
		.post(totr[mymethod);
	*/
};