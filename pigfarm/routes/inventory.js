var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('inventory', { title: 'Express' });
});

var task = require('./task.js');

task.handlerFactory(router, 'fertilization')
task.handlerFactory(router, 'relocation')

module.exports = router;
