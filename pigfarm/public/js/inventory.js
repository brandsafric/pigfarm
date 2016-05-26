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

	var isArray = function(o) {
		return Object.prototype.toString.call(o) === '[object Array]';
	}

	var complexDataToRows = function(data){

		var rows = new Array();

		for (var property in data) {
			if (!data.hasOwnProperty(property))
				continue;
			var p = data[property];
//			console.log(p);

			if (isArray(p)) {
				console.log(property + ' is array');
				for (var i = 0; i < p.length; i++) {
					rows = rows.concat(complexDataToRows(p[i]));
//					console.log(complexDataToRows(p[i]));
				}
//				console.log(rows);
				break;
			}
		}

//		console.log(rows);

		var r = '';

		for (var property in data) {
			if (!data.hasOwnProperty(property))
				continue;
			var p = data[property];

			if (isArray(p))
				r = r + rows[0];
			else if (rows.length >= 2)
				r = r + '<td rowspan=' + rows.length + '>' + p + '</td>';
			else
				r = r + '<td>' + p + '</td>';
		}

//		console.log(r);

		rows[0] = r;

//		console.log(rows);

		return rows;
	}

	var loadTable = function(tableId, accessPoint, date) {

		var tableContent = '';

		$.getJSON(accessPoint + encodeURI(date) , function( data ) {

			$(tableId).empty();

			$.each(data, function() {
				for (var property in this) {
					if (!this.hasOwnProperty(property))
						continue;
//					console.log(property);
				}
//				tableContent += '<tr><td></td>';
//				tableContent += '<td><pre>' + JSON.stringify(this, null, ' ') + '</pre></td><td></td><td></td><td></td>';
//				tableContent += '</tr>';

				var rows = complexDataToRows(this);
				for (var i = 0; i < rows.length; i++) {
					tableContent += '<tr>' + rows[i] + '<td></td></tr>';
				}
				console.log(rows);
			});

			$(tableId).append(tableContent);

//			console.log(tableContent);
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
