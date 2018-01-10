var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  Administrator = require('./api/models/totrAdministratorModel')
  Tenat = require('./api/models/totrTenantModel'); //created model loading here
  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
  var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
      mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
      mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
      mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
      //mongoPassword = process.env[mongoServiceName + '_PASSWORD']
      //mongoUser = process.env[mongoServiceName + '_USER'];
	  mongoPassword = 'totr_password',
      mongoUser = 'totr_admin';

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;
  }
}

if (mongoURL != null){
	// mongoose instance connection url connection
	mongoose.Promise = global.Promise;
	mongoose.connect(mongoURL);
}
else{
	;//an error should be raise here
}


// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});


var routes = require('./api/routes/testRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('My custom RESTful API server started on: ' + port);