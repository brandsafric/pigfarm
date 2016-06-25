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

router.get('/mother/:pigId', function(req, res) {
	var pigId = decodeURI(req.params.pigId);
	console.log(pigId);

	var doc = {};

	var db = req.db;

	var waiting = 2;

	var collection = db.get('fertilization');
	collection.find( { pigId : pigId }, { sort : {_id:-1}, limit : 1 }, function(e,docs){
		console.log(docs);
		if (docs[0]) {
			doc['motherStatus'] = docs[0]['motherStatus'];
			var date = docs[0]['date'];
			doc['fertilizedDate'] = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
		} else {
			doc['motherStatus'] = '(정보 없음)';
			doc['fertilizedDate'] = '(정보 없음)';
		}
		if (--waiting == 0)
			res.json(doc);
	});

	collection = db.get('relocation');
	collection.find( { pigId : pigId }, { sort : {_id:-1}, limit : 1 }, function(e,docs){
		console.log(docs);
		if (docs[0]) {
			doc['prevHouse'] = docs[0]['newHouse'];
		} else {
			doc['prevHouse'] = '(정보 없음)';
		}
		if (--waiting == 0)
			res.json(doc);
	});
});

router.get('/inventory/daily/field/house', function(req, res) {
	var houses = new Array();

	var db = req.db;

	var collection = db.get('daily');
	collection.find( {}, { sort : {_id:-1}, limit : 1 }, function(e,docs){
		if (docs[0]) {
			for (var i = 0; i < docs[0].houses.length; i++) {
				houses.push(docs[0].houses[i].name);
			}
		}
//		console.log(houses);
		res.json(houses);
	});
});

router.get('/inventory/daily/:houseName', function(req, res) {
	var houseName = decodeURI(req.params.houseName);
	console.log(houseName);

	var doc = {};
	doc['wob'] = new Array();

	var db = req.db;

	var collection = db.get('daily');
	collection.find( {}, { sort : {_id:-1}, limit : 1 }, function(e,docs){
//		console.log(docs);
		if (docs[0]) {
			for (var i = 0; i < docs[0].houses.length; i++) {
				var house = docs[0].houses[i];
				console.log(house);
				if (house.name == houseName) {
					for (var j in house.groups) {
						if (house.groups[j].wob)
							doc['wob'].push(house.groups[j].wob.toString());
					}
				}
			}
		}
//		console.log(doc);
		res.json(doc);
	});
});

module.exports = router;
