// Call packages required 
var path = require('path');
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const expressSession = require('express-session');
var passport = require('passport');

const MongoStore = require('connect-mongo')(expressSession);

// Passport.js Initialization
require('./app/config/passport');
app.use(passport.initialize());


// Initialize bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(expressSession({
	secret: 'mdfkldfgkl&*(sas/d,asldsjf()*)(mlksdmfNfjSDsdfYUHNn',
	cookie: { maxAge: 60000 },
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({
	    db: 'rentwisesession',
	    url: 'mongodb://127.0.0.1:27017/rentwise'
	})
}));


// Set port
var port = process.env.PORT || 8080;


// Connect with the MongoDB NoSQL database
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/rentwise');


// API routes
var routes = require('./app/routes/index');


// Routes via /api
app.use('/api', routes);


// Middleware Catch Errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"messages" : err.name + ": " + err.message});
  }
});


app.listen(port);
console.log('Server running successfully on port: ' + port);

app.use(express.static(path.join(__dirname, 'client')));
app.use(function(req, res) {
	res.sendFile(path.join(__dirname, 'client', 'index.html'));
});