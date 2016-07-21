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

var onInsert = function(db, relocation, cb) {
	var collection = db.get('daily');
	var date1 = new Date();
	date1.setHours(0, 0, 0);
	var date2 = new Date(date1);
	date2.setDate(date2.getDate() + 1);
	console.log(date1);
	console.log(date2);
	collection.find({ date : { $gte: date1, $lt: date2 } }, {}, function(e, docs) {
//	collection.find( {}, { sort : {_id:-1}, limit : 1 }, function(e,docs){
		console.log(relocation.house, relocation['*house:houseAfter'], relocation.wob, relocation.count);
		var daily = docs[0];
		var groupFrom = findGroup(findHouse(daily, relocation.house), relocation.wob);
		var houseTo = findHouse(daily, relocation['*house:houseAfter']);
		if (houseTo == null) {
			houseTo = { name:relocation['*house:houseAfter'], groups:[] };
			daily.houses.push(houseTo);
		}
		var groupTo = findGroup(houseTo, relocation.wob);
		if (groupTo == null) {
			groupTo = { wob:relocation.wob, hcnt:0 };
			houseTo.groups.push(groupTo);
		}
		relocation.count = parseInt(relocation.count);
		groupFrom.hcnt -= relocation.count;
		groupTo.hcnt += relocation.count;
		console.log(groupFrom, groupTo);
		collection.update({ _id : daily._id }, { $set: daily }, function(err, result) {
			cb(err);
		});
	});
}

var onRemove = function(db, id, cb) {
	console.log(db, id, cb);
	cb();
}

task.handlerFactory(router, 'relocation2', onInsert, null, onRemove);

module.exports = router;
