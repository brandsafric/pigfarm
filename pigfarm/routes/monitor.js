var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('monitor', { title: '돈사 모니터 - 정진농장 통합관리 시스템' });
});

router.get('/temperature/:count', function(req, res) {
	var db = req.db;
	var collection = db.get('temperature');
	var count = req.params.count;
	console.log(count);
	collection.find( {}, { sort : {_id:-1}, limit : count }, function(e,docs){
		console.log(docs);
		res.json(docs);
	});
});

router.post('/temperature', function(req, res) {
	var db = req.db;
	var collection = db.get('temperature');
	console.log(req.body);
	collection.insert(req.body, function(err, result) {
		console.log(result);
		res.send((err == null) ? { msg : '', id : result._id } : { msg : err });
	});
});

module.exports = router;
