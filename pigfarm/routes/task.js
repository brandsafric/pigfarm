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
		res.send((err == null) ? { msg : '' } : { msg : err })
	})
//	res.send({ msg : 'success!!!' });
})

module.exports = router;
