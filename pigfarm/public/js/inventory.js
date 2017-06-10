$(document).ready(function() {
	var tables = [
		new Table(
			'#relocation',
			'/inventory/relocation2/',
			[
				'+houseBefore:house',
				'=wob',
				'count',
				'*houseAfter:house'
			],
			'/views/inventory/daily/',
			function(recordId) {
				console.log('onAddEntry', this.tableId, recordId);
				loadTable('#daily', '/inventory/daily/', getCurrentDate());
			},
			null,
			function(recordId) {
				loadTable('#daily', '/inventory/daily/', getCurrentDate());
			}
		)
	];

	initializeTables(tables);

	loadTable('#daily', '/inventory/daily/', getCurrentDate());

	$('#date-selector').on('changeDate', function(d) {
		console.log(d); // Do not use this!! It returns local midnight, which is not what we want!!!
		var date = new Date(getCurrentDate());
		console.log(date);
		if (d.viewMode == "days") {
			$('#date-selector').datepicker('hide');
			console.log('todo: reload daily inventory view');
			loadTable('#daily', '/inventory/daily/', getCurrentDate());
		}
	});
});
