var expressSession = require("express-session");
var requestJson = require("request-json");

module.exports.list  = function(req, res) {
    var sess = req.session;
    if (sess.products) {
        return res.json(sess.products);
    } else {
        return res.json({});
    }
};

module.exports.addItem = function(req, res) {
    var pid = req.params.pid;
    var client = requestJson.createClient('http://107.170.217.216:8080');
    client.get('api/products/' + pid, function(err, result, data) {
        if (err) {
            return res.sendStatus(500);
        }
        var productInfo = {
			"title": data.title,
			"price": data.price
        };
        var sess = req.session;
        if (!sess.products) {
            sess.products = new Array();
        }
        sess.products.push(productInfo);
        return res.send({
            ItemCount: sess.products.length
        });
    });
};

module.exports.removeItem = function(req, res) {
    var pid = req.params.pid;
    var sess = req.session;
    if (sess.products) {
        sess.products.pop();
    }
    return res.send({
        ItemCount: sess.products.length
    });
};
