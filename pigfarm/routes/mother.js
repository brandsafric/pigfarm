var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('mother', { title: 'Express' });
});

var task = require('./task.js');

var onInsertIntroduction = function(db, introduction, cb) {
	console.log(introduction.pigId, introduction.motherStatus);
	var collection = db.get('mother');
	collection.insert(introduction, function(err, result) {
		cb(err);
	});
}

var onRemoveIntroduction = function(db, id, cb) {
//	console.log(db, id, cb);
	var collection = db.get('introduction');
	collection.find({ _id : id }, {}, function(e,docs) {
		console.log(e, docs);
		var introduction = docs[0];
		var collection = db.get('mother');
		collection.remove({ pigId : introduction.pigId }, function(err, result) {
			cb(err);
		});
	});
}

task.handlerFactory(router, 'introduction', onInsertIntroduction, null, onRemoveIntroduction);

var getMother = function(db, pigId, cb) {
	var collection = db.get('mother');
	var date1 = new Date();
	date1.setHours(0, 0, 0);
	date1.setMilliseconds(0);
	var date2 = new Date(date1);
	date2.setDate(date2.getDate() + 1);
	console.log(date1);
	console.log(date2);
	collection.find({ $and : [ { date : { $gte: date1, $lt: date2 } }, { pigId : pigId } ] }, {}, function(e, docs) {
		console.log(docs);
		cb(docs[0]);
	});
}

var onInsert = function(db, fertilization, cb) {
	console.log(fertilization.pigId, fertilization.motherStatus);
	getMother(db, fertilization.pigId, function(mother) {
		mother.motherStatus = '임신돈';
		var collection = db.get('mother');
		collection.update({ _id : mother._id }, { $set: mother }, function(err, result) {
			cb(err);
		});
	});
}

var onRemove = function(db, id, cb) {
//	console.log(db, id, cb);
	var collection = db.get('fertilization');
	collection.find({ _id : id }, {}, function(e,docs) {
//		console.log(e, docs);
		var fertilization = docs[0];
		getMother(db, fertilization.pigId, function(mother) {
			mother.motherStatus = fertilization.motherStatus;
			var collection = db.get('mother');
			collection.update({ _id : mother._id }, { $set: mother }, function(err, result) {
				cb(err);
			});
		});
	});
}

task.handlerFactory(router, 'fertilization', onInsert, null, onRemove);
task.handlerFactory(router, 'relocation');

module.exports = router;
