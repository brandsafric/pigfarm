function handlerFactory(router, tableName, onInsert, onUpdate, onRemove) {

	router.get('/' + tableName + '/last', function(req, res) {
		console.log(req.params.name);
		var db = req.db;
		var collection = db.get(tableName);
		collection.find( {}, { sort : {_id:-1}, limit : 1 }, function(e,docs){
			res.json(docs);
		});
	});

	router.get('/' + tableName + '/field/:name', function(req, res) {
		console.log(req.params.name);
		var db = req.db;
		var collection = db.get(tableName);
		collection.distinct(req.params.name, {}, function(e,docs){
			res.json(docs);
		});
	});

	router.get('/' + tableName + '/:date', function(req, res) {
		var db = req.db;
		var collection = db.get(tableName);
		var date1 = new Date(decodeURI(req.params.date));
		var date2 = new Date(date1);
		date2.setDate(date2.getDate() + 1);
		console.log('yay!!!!');
		console.log(decodeURI(req.params.date));
		console.log(date1);
		console.log(date2);
		collection.find({ date : { $gte: date1, $lt: date2 } }, {}, function(e,docs){
			res.json(docs);
		});
	});

	router.get('/' + tableName, function(req, res) {
		var db = req.db;
		var collection = db.get(tableName);
		collection.find({}, {}, function(e,docs){
			res.json(docs);
		});
	});

	router.post('/' + tableName, function(req, res) {
		var db = req.db;
		var collection = db.get(tableName);
		req.body.date = new Date(req.body.date);
		collection.insert(req.body, function(err, result) {
			console.log(result);
			if (onInsert) {
				onInsert(db, req.body, function(err) {
					res.send((err == null) ? { msg : '', id : result._id } : { msg : err });
				});
			} else {
				res.send((err == null) ? { msg : '', id : result._id } : { msg : err });
			}
		});
	});

	router.post('/' + tableName + '/:id', function(req, res) {
		var db = req.db;
		var collection = db.get(tableName);
		console.log(req.params.id);
		console.log(req.body);
		// https://mongodb.github.io/node-mongodb-native/markdown-docs/insert.html#replacement-object
		collection.update({ _id : req.params.id }, { $set: req.body }, function(err, result) {
			console.log(result);
			if (onUpdate) {
				onUpdate(db, req.body, function(err) {
					res.send((err == null) ? { msg : '' } : { msg : err });
				});
			} else {
				res.send((err == null) ? { msg : '' } : { msg : err });
			}
		});
	});

	router.delete('/' + tableName + '/:id', function(req, res) {
		try {
			var db = req.db;
			var collection = db.get(tableName);
			if (onRemove) {
				onRemove(db, req.params.id, function(err) {
					collection.remove({ _id : req.params.id }, function(err) {
						res.send((err === null) ? { msg : '' } : { msg : 'error: ' + err });
					});
				});
			} else {
				collection.remove({ _id : req.params.id }, function(err) {
					res.send((err === null) ? { msg : '' } : { msg : 'error: ' + err });
				});
			}
		} catch (e) {
			res.send(404);
		}
	});
}

exports.handlerFactory = handlerFactory;
