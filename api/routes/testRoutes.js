'use strict';
module.exports = function(app) {
	var totr = require('../controllers/totrController');
	
	app.route('/totr/register')
		.post(totr.register);
	
	app.route('/totr/login')
		.post(totr.login);
};