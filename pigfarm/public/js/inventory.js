$(document).ready(function() {
	var tables = [
		new Table(
			'#relocation',
			'/inventory/relocation2/',
			[
				'+cage:cageBefore',
				'=wob',
				'count',
				'*cage:cageAfter'
			],
			'/inventory/daily/'
		)
	];

	initializeTables(tables);

	var loadTable = function(tableId, accessPoint, date) {

		var tableContent = '';

		$.getJSON(accessPoint + encodeURI(date) , function( data ) {

			$(tableId).empty();

			$.each(data, function() {
				tableContent += '<tr><td></td>';
				tableContent += '<td>' + JSON.stringify(this) + '</td><td></td><td></td><td></td>';
				tableContent += '</tr>';
			});

			$(tableId).append(tableContent);

			console.log(tableContent);
		});
	}

	loadTable('#daily', '/inventory/daily/', getCurrentDate());

	$('#date-selector').on('changeDate', function(d) {
		console.log(d); // Do not use this!! It returns local midnight, which is not what we want!!!
		var date = new Date(getCurrentDate());
		console.log(date);
		if (d.viewMode == "days") {
			$('#date-selector').datepicker('hide');
			console.log('todo: reload daily inventory view');
		}
	});
});
