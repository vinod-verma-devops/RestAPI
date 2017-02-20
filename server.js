// Call packages required 
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');


// Passport.js Initialization
require('./app/config/passport');
app.use(passport.initialize());


// Initialize bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Middleware Catch Errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"messages" : err.name + ": " + err.message});
  }
});


// Set port
var port = process.env.PORT || 8080;


// Connect with the MongoDB NoSQL database
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/test');


// API routes
var routes = require('./app/routes/index');


// Routes via /api
app.use('/api', routes);


app.listen(port);
console.log('Server running successfully on port: ' + port);