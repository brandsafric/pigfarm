$(document).ready(function() {
	var tables = [
		new Table(
			'#introduction',
			'/mother/introduction/',
			[
				'pigId',
				'house',
				'motherStatus'
			],
			null,
			function(record) {
				console.log('onAddEntry', this.tableId, record._id);
				tables[1].setAutoComplete('/views/mother/field/pigId', 'pigId');
				tables[2].setAutoComplete('/views/mother/field/pigId', 'pigId');
				loadTable('#mother', '/mother/mother/', getCurrentDate(), function() {
					var row = getRowByColumnValue('#mother', 1, record.pigId)
					console.log(row);
					for (var j = 0, cell; cell = row.cells[j]; j++) {
						cell.style.cssText = "background-color:Lavender; font-weight:bold";
						// var label = cell.childNodes[0].childNodes[1];
						// if (label) {
			 			// 	label.style.setProperty("text-decoration", "line-through");
						// 	label.style.cssText = "font-weight:bold";
						// }
					}
				});
			},
			null,
			function(recordId) {
				// tables[0].populateTable(getCurrentDate());
				tables[1].setAutoComplete('/views/mother/field/pigId', 'pigId');
				tables[2].setAutoComplete('/views/mother/field/pigId', 'pigId');
				loadTable('#mother', '/mother/mother/', getCurrentDate());
			}
		),
		new Table(
			'#fertilization',
			'/mother/fertilization/',
			[
				'+pigId',
				'-motherStatus',
				'batch',
				'daysSinceStopBreastFeed',
				'administration1',
				'administration2',
				'administration3',
				'administrator',
				'status'
			],
			'/views/mother/',
			function(record) {
				console.log('onAddEntry', this.tableId, record._id);
				loadTable('#mother', '/mother/mother/', getCurrentDate());
			},
			null,
			function(recordId) {
				loadTable('#mother', '/mother/mother/', getCurrentDate());
			}
		),
		new Table(
			'#relocation',
			'/mother/relocation/',
			[
				'+pigId',
				'-motherStatus',
				'-fertilizedDate',
				'-prevHouse',
				'newHouse'
			],
			'/views/mother/',
			function(record) {
				console.log('onAddEntry', this.tableId, record._id);
				loadTable('#mother', '/mother/mother/', getCurrentDate());
			},
			null,
			function(recordId) {
				loadTable('#mother', '/mother/mother/', getCurrentDate());
			}
		)
	];

	initializeTables(tables);

	loadTable('#mother', '/mother/mother/', getCurrentDate());

});
