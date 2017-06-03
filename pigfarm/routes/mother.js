var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('mother', { title: 'Express' });
});

var task = require('./task.js');

task.handlerFactory(router, 'introduction')

var getMother = function(db, pigId, cb) {
	var collection = db.get('introduction');
	collection.find({ pigId : pigId }, {}, function(e, docs) {
//	collection.find( {}, { sort : {_id:-1}, limit : 1 }, function(e,docs){
		cb(docs[0]);
	});
}

var onInsert = function(db, fertilization, cb) {
	console.log(fertilization.pigId, fertilization.motherStatus);
	getMother(db, fertilization.pigId, function(mother) {
		mother.motherStatus = '임신돈';
		var collection = db.get('introduction');
		collection.update({ _id : mother._id }, { $set: mother }, function(err, result) {
			cb(err);
		});
	});
}

var onRemove = function(db, id, cb) {
//	console.log(db, id, cb);
	var collection = db.get('fertilization');
	collection.find({ _id : id }, {}, function(e,docs){
//		console.log(e, docs);
		var fertilization = docs[0];
		getMother(db, fertilization.pigId, function(mother) {
			mother.motherStatus = '(예전 상태 알아내서 넣어주기)';
			var collection = db.get('introduction');
			collection.update({ _id : mother._id }, { $set: mother }, function(err, result) {
				cb(err);
			});
		});
	});
}

task.handlerFactory(router, 'fertilization', onInsert, null, onRemove);
task.handlerFactory(router, 'relocation');

module.exports = router;
