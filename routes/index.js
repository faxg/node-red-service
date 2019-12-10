var express = require('express');
var router = express.Router();

// The logical service name
var serviceName = "(default service)"

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: serviceName });
});


module.exports = router;
