var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Administrator = require('./api/models/totrAdministratorModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:BAkt4pCpJt2KPL4l@mongodb-ostest.1d35.starter-us-east-1.openshiftapps.com:27017/sampledb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/testRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('My custom RESTful API server started on: ' + port);