var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('inventory', { title: 'Express' });
});

var task = require('./task.js');

task.handlerFactory(router, 'daily')
task.handlerFactory(router, 'relocation2')

module.exports = router;
