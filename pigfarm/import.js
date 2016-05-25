var monk = require('monk');
var db = monk('localhost:27017/pigfarm');

var Excel = require('exceljs');
var workbook = new Excel.Workbook();
//workbook.xlsx.readFile('/Users/jiwon/Downloads/201605.xlsx').then(function() {
workbook.xlsx.readFile('../201605.xlsx').then(function() {
	var worksheet = workbook.getWorksheet('이월');
//	console.log(worksheet.getCell('E12'));
//	worksheet.getCell('F13').value = 12345;
//	console.log(worksheet.getCell('F13'));
//	console.log(worksheet.getCell('F13').value);
//	workbook.xlsx.writeFile('aaa.xlsx');

	console.log('start');
	var houseName;
	var obj = new Object();
	obj.date = new Date();
	obj.houses = new Array();
	var house;
	worksheet.eachRow(function(row, rowNumber) {
		if (rowNumber < 80)
			return;
		if (row.getCell(1).value) {
			houseName = row.getCell(1).value;
//			console.log('Row ' + rowNumber + ' = ' + houseName);
//			console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
			if (house) {
//				console.log(house);
				obj.houses.push(house);
			}
			house = new Object();
			house.name = houseName;
			house.groups = new Array();
//			console.log(house.name);
		}
		var hcnt = row.getCell(5).value;
		if (hcnt) {
			if (typeof hcnt === 'object')
				hcnt = hcnt.result;
			var wob = row.getCell(2).value;
//			console.log(houseName + ',' + wob + ',' + hcnt);
			house.groups.push({ wob:wob, hcnt:hcnt });
		}
	});
	if (house) {
//		console.log(house);
		obj.houses.push(house);
	}
	console.log(JSON.stringify(obj, null, ' '));

	var collection = db.get('daily');
	collection.insert(obj, function(err, result) {
		console.log('daily insert ' + (result ? ('success(' + result._id + ')') : 'fail!'));
	});

	console.log('done');
});
