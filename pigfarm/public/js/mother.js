$(document).ready(function() {
	var tables = [
		new Table(
			'#introduction',
			'/mother/introduction/',
			[
				'pigId',
				'motherStatus'
			]
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
			'/views/mother/'
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
});
