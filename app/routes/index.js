var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({secret: 'mdfkldfgkl&*(sas/d,asldsjf()*)(mlksdmfNfjSDsdfYUHNn', userProperty: 'payload'});

var multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();


var Controller = require('../controller.js');


router.post('/registerVendor', Controller.registerVendor);
router.post('/loginVendor', usernameToLowerCase, Controller.loginVendor);
router.get('/profileVendor', auth, Controller.profileVendor);

router.post('/registerUser', Controller.registerUser);
router.post('/loginUser', emailToLowerCase, Controller.loginUser);
router.get('/profileUser', auth, Controller.profileUser);

router.get('/viewProduct', Controller.viewProduct);
router.post('/addProduct', auth, multipartyMiddleware, Controller.addProduct);
router.get('/viewOrder', Controller.viewOrder);
router.put('/addOrder', Controller.addOrder);


function emailToLowerCase(req, res, next){
    req.body.email = req.body.email.toLowerCase();
    next();
}

function usernameToLowerCase(req, res, next){
    req.body.username = req.body.username.toLowerCase();
    next();
}

module.exports = router;