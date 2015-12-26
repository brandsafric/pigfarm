var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('task', { title: 'Express' });
});

router.get('/fertilization', function(req, res) {
	var db = req.db;
	var collection = db.get('fertilization');
	collection.find({},{},function(e,docs){
		res.json(docs);
	});
});

router.post('/fertilization', function(req, res) {
	var db = req.db;
	var collection = db.get('fertilization');
	collection.insert(req.body, function(err, result) {
		console.log(result);
		res.send((err == null) ? { msg : '', id : result._id } : { msg : err });
	});
//	res.send({ msg : 'success!!!' });
});

router.delete('/fertilization/:id', function(req, res) {
	try {
		var db = req.db;
		var collection = db.get('fertilization');
		collection.remove({ _id : req.params.id }, function(err) {
			res.send((err === null) ? { msg : '' } : { msg : 'error: ' + err });
		});
	} catch (e) {
		res.send(404);
	}
});

module.exports = router;
