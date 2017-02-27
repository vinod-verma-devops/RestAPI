var Order = require('../../../app/models/orders');

module.exports.addOrder = function(req, res) {
	
	console.log("Here");
	
	var order = new Order();
	
	if (!req.payload._id) {
		res.status(401).json({
			"message" : "UnauthorizedError: private profile"
		});
	} else {
		
		var user = req.payload._id;	
		
		var product_id = req.params.pid;	
		
		console.log(user);
		console.log(product_id);
		
		/*order.user = user;
		
		order.save(function(err, order) {
			Order.findOne(order).populate('orders.order_by').exec(function(err, order) {
				res.json({
					status: 'success';
					message: 'You have ordered this item',
				});
			});
		});*/
		
	}

};