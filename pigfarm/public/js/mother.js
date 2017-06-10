$(document).ready(function() {
	var tables = [
		new Table(
			'#introduction',
			'/mother/introduction/',
			[
				'pigId',
				'motherStatus'
			],
			null,
			function(recordId) {
				console.log('onAddEntry', this.tableId, recordId);
				tables[1].setAutoComplete('/views/mother/field/pigId', 'pigId');
				tables[2].setAutoComplete('/views/mother/field/pigId', 'pigId');
			},
			null,
			function(recordId) {
				tables[0].populateTable(getCurrentDate());
				tables[1].setAutoComplete('/views/mother/field/pigId', 'pigId');
				tables[2].setAutoComplete('/views/mother/field/pigId', 'pigId');
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
			function(recordId) {
				console.log('onAddEntry', this.tableId, recordId);
				tables[0].populateTable(getCurrentDate());
			},
			null,
			function(recordId) {
				tables[0].populateTable(getCurrentDate());
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
			'/views/mother/'
		)
	];

	initializeTables(tables);

	loadTable('#mother', '/mother/mother/');

});
