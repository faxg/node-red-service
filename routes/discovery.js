var express = require('express');
var router = express.Router();

// The logical service name
var serviceName = "(default service)"

/* GET home page. */
router.get('/', function(req, res, next) {
	var discoveryDocument = {
		"timestamp": {endpoint: "http://localhost:3000/api/timestamp"},
		"lowercase": {endpoint: "http://localhost:3000/api/lowercase"},
		"serviceB/echo": {endpoint: "http://serviceb.default.svc.local/api/lowercase"}
	}
	
	res.json(discoveryDocument);

});


module.exports = router;
