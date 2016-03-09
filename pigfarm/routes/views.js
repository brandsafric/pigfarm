var express = require('express');
var router = express.Router();

router.get('/mother/field/pigId', function(req, res) {
	console.log(req.params.name);
	var db = req.db;
	var collection = db.get('fertilization');
	collection.distinct('pigId', {}, function(e,docs){
		res.json(docs);
	});
});

module.exports = router;
