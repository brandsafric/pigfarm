var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('monitor', { title: '돈사 모니터 - 정진농장 통합관리 시스템' });
});

router.get('/temperature/:count', function(req, res) {
	var db = req.db;
	var collection = db.get('temperature');
	var count = req.params.count;
//	console.log(count);
	collection.find( {}, { sort : {_id:-1}, limit : count }, function(e,docs){
//		console.log(docs);
		res.json(docs);
	});
});

router.post('/temperature', function(req, res) {
	var db = req.db;

	var agentNum = '1001001';

	var collection = db.get('temperature');
	req.body.num = agentNum;
	req.body.dt = new Date();
//	console.log(req.body);
	collection.insert(req.body, function(err, result) {
		console.log('temperature insert ' + (result ? 'success' : 'fail!'));
		res.send((err == null) ? { msg : '', id : result._id } : { msg : err });
	});

	var collection2 = db.get('agent');
	var agent = { num : agentNum, lastPing : new Date() };
//	console.log(agent);
	collection2.update( { num : agentNum }, { $set: agent }, { upsert : true }, function(err, result) {
		console.log('agent(' + agentNum + ') status update ' + (result ? 'success' : 'fail!'));
	})
});

module.exports = router;
