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
	collection.find({ pigId : pigId }, {}, function(e, docs) {
		console.log(docs);
		cb(docs[0]);
	});
}

var onInsertFertilization = function(db, fertilization, cb) {
	console.log(fertilization.pigId, fertilization.motherStatus);
	getMother(db, fertilization.pigId, function(mother) {
		mother.motherStatus = '임신돈';
		var collection = db.get('mother');
		collection.update({ _id : mother._id }, { $set: mother }, function(err, result) {
			cb(err);
		});
	});
}

var onRemoveFertilization = function(db, id, cb) {
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

task.handlerFactory(router, 'fertilization', onInsertFertilization, null, onRemoveFertilization);

var onInsertRelocation = function(db, relocation, cb) {
	console.log(relocation.pigId, relocation.newHouse);
	getMother(db, relocation.pigId, function(mother) {
		mother.house = relocation.newHouse;
		var collection = db.get('mother');
		collection.update({ _id : mother._id }, { $set: mother }, function(err, result) {
			cb(err);
		});
	});
}

var onRemoveRelocation = function(db, id, cb) {
//	console.log(db, id, cb);
	var collection = db.get('relocation');
	collection.find({ _id : id }, {}, function(e,docs) {
//		console.log(e, docs);
		var relocation = docs[0];
		getMother(db, relocation.pigId, function(mother) {
			mother.house = relocation.prevHouse;
			var collection = db.get('mother');
			collection.update({ _id : mother._id }, { $set: mother }, function(err, result) {
				cb(err);
			});
		});
	});
}

task.handlerFactory(router, 'relocation', onInsertRelocation, null, onRemoveRelocation);
task.handlerFactory(router, 'mother');

module.exports = router;
