var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('inventory', { title: 'Express' });
});

var task = require('./task.js');

task.handlerFactory(router, 'daily')

var findHouse = function(daily, name) {
	if (daily == null)
		return null;
	for (var i = 0; i < daily.houses.length; i++) {
		if (daily.houses[i].name == name)
			return daily.houses[i];
	}
	return null;
}

var findGroup = function(house, wob) {
	if (house == null)
		return null;
	for (var j in house.groups) {
		if (house.groups[j].wob == wob)
			return house.groups[j];
	}
	return null;
}

var getTodaysInventory = function(db, cb) {
	var collection = db.get('daily');
	var date1 = new Date();
	date1.setHours(0, 0, 0);
	date1.setMilliseconds(0);
	var date2 = new Date(date1);
	date2.setDate(date2.getDate() + 1);
	console.log(date1);
	console.log(date2);
	collection.find({ date : { $gte: date1, $lt: date2 } }, {}, function(e, docs) {
//	collection.find( {}, { sort : {_id:-1}, limit : 1 }, function(e,docs){
		cb(docs[0]);
	});
}

var getGroup = function(daily, houseName, wob) {
	var house = findHouse(daily, houseName);
	if (house == null) {
		house = { name:houseName, groups:[] };
		daily.houses.push(house);
	}
	var group = findGroup(house, wob);
	if (group == null) {
		group = { wob:wob, hcnt:0 };
		house.groups.push(group);
	}
	return group;
}

var onInsert = function(db, relocation, cb) {
	console.log(relocation.houseBefore, relocation.houseAfter, relocation.wob, relocation.count);
	getTodaysInventory(db, function(daily) {
		var groupFrom = getGroup(daily, relocation.houseBefore, relocation.wob);
		var groupTo = getGroup(daily, relocation.houseAfter, relocation.wob);
		relocation.count = parseInt(relocation.count);
		groupFrom.hcnt -= relocation.count;
		groupTo.hcnt += relocation.count;
		var collection = db.get('daily');
		collection.update({ _id : daily._id }, { $set: daily }, function(err, result) {
			cb(err);
		});
	});
}

var onRemove = function(db, id, cb) {
//	console.log(db, id, cb);
	var collection = db.get('relocation2');
	collection.find({ _id : id }, {}, function(e,docs){
//		console.log(e, docs);
		var relocation = docs[0];
		getTodaysInventory(db, function(daily) {
			var groupFrom = getGroup(daily, relocation.houseBefore, relocation.wob);
			var groupTo = getGroup(daily, relocation.houseAfter, relocation.wob);
			relocation.count = parseInt(relocation.count);
			groupFrom.hcnt += relocation.count;
			groupTo.hcnt -= relocation.count;
			var collection = db.get('daily');
			collection.update({ _id : daily._id }, { $set: daily }, function(err, result) {
				cb(err);
			});
		});
	});
}

task.handlerFactory(router, 'relocation2', onInsert, null, onRemove);

module.exports = router;
