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

var getCopyForUpdate = function(data) {
	var data2 = {};
	for (var property in data) {
		if (!data.hasOwnProperty(property))
			continue;
		if (property != '_id')
			data2[property] = data[property];
	}
	console.log(data2);
	return data2;
}

var onInsertFertilization = function(db, fertilization, cb) {
	console.log(fertilization.pigId, fertilization.motherStatus);
	getMother(db, fertilization.pigId, function(mother) {
		mother.motherStatus = '임신돈';
		var collection = db.get('mother');
		collection.update({ _id : mother._id }, { $set: getCopyForUpdate(mother) }, function(err, result) {
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
			collection.update({ _id : mother._id }, { $set: getCopyForUpdate(mother) }, function(err, result) {
				cb(err);
			});
		});
	});
}

task.handlerFactory(router, 'fertilization', onInsertFertilization, null, onRemoveFertilization);


var onInsertDelivery = function(db, delivery, cb) {
	console.log(delivery.pigId, delivery.motherStatus);
	getMother(db, delivery.pigId, function(mother) {
		mother.motherStatus = '이유모돈?';
		var collection = db.get('mother');
		collection.update({ _id : mother._id }, { $set: getCopyForUpdate(mother) }, function(err, result) {
			cb(err);
		});
	});
}

var onRemoveDelivery = function(db, id, cb) {
//	console.log(db, id, cb);
	var collection = db.get('delivery');
	collection.find({ _id : id }, {}, function(e,docs) {
//		console.log(e, docs);
		var delivery = docs[0];
		getMother(db, delivery.pigId, function(mother) {
			mother.motherStatus = '임신돈';
			var collection = db.get('mother');
			collection.update({ _id : mother._id }, { $set: getCopyForUpdate(mother) }, function(err, result) {
				cb(err);
			});
		});
	});
}

task.handlerFactory(router, 'delivery', onInsertDelivery, null, onRemoveDelivery);



var onInsertRelocation = function(db, relocation, cb) {
	console.log(relocation.pigId, relocation.newHouse);
	getMother(db, relocation.pigId, function(mother) {
		mother.house = relocation.newHouse;
		var collection = db.get('mother');
		collection.update({ _id : mother._id }, { $set: getCopyForUpdate(mother) }, function(err, result) {
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
			collection.update({ _id : mother._id }, { $set: getCopyForUpdate(mother) }, function(err, result) {
				cb(err);
			});
		});
	});
}

task.handlerFactory(router, 'relocation', onInsertRelocation, null, onRemoveRelocation);
task.handlerFactory(router, 'mother');

module.exports = router;
