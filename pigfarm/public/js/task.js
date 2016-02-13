function getTable(tableId) {
	return $(tableId).parent()[0];
}

//function getHeaderCell(tableId, col) {
//	return getTable(tableId).rows[0].cells[col];
//}

function getIdFromRow(row) {
	return row.cells.item(0).innerHTML;
}

function getIdFromRowJQ(row) {
	return row.find('td:nth-child(1)').html();
}

function getCurrentDate() {
	console.log($('#date-selector').prop('value'));
	var date = new Date($('#date-selector').prop('value'));
	console.log(date);
	return date;
}

function getRow(tableId, id) {
	var table = getTable(tableId);
//	console.log(table.rows);
	for (var i = 0, row; row = table.rows[i]; i++) {
//		console.log(getIdFromRow(row));
		if (getIdFromRow(row) == id)
			return row;
	}
	return null;
}

function deleteRow(tableId, accessPoint, recordId) {
	console.log(recordId);
	$.ajax({
		type : 'DELETE',
		url : accessPoint + recordId
	}).done(function(res) {
		console.log('deleted ' + recordId);
		var row = getRow(tableId, recordId);
		console.log(row);
		for (var j = 0, cell; cell = row.cells[j]; j++) {
			cell.style.cssText = "background-color:LightCyan";
			var label = cell.childNodes[0].childNodes[1];
			if (label) {
//				label.style.setProperty("text-decoration", "line-through");
				label.style.cssText = "text-decoration:line-through; color:LightSteelBlue; ";
			}
		}
	});
	return false;
}

function getFieldClassName(fieldName) {
	return fieldName + '-field';
}

function generateField(fieldName, data) {
	var field = '';
	field += '<td rel="' + fieldName + '"><div class="field">';
	field += '	<label>' + data + '</label>';
	field += '	<input type="text" class="form-control field-input ' + getFieldClassName(fieldName) + '" value="' + data + '" />';
	field += '</div></td>';
	return field;
}

function generateFieldNew(fieldName, data) {
	var field = '';
	field += '<td><div class="field-new">';
	field += '	<input type="text" class="form-control field-input-new ' + getFieldClassName(fieldName) + '" value="' + data + '" />';
	field += '</div></td>';
	return field;
}

function setAutoComplete(accessPoint, fieldName) {
	$.getJSON(accessPoint + 'field/' + fieldName, function(data) {
//		console.log(data);
		$('.' + getFieldClassName(fieldName)).autocomplete({
			source: data
		});
	});
}

function Table(tableId, accessPoint, fieldNames) {
	this.tableId = tableId;
	this.accessPoint = accessPoint;
	this.fieldNames = fieldNames;
//	console.log(this.tableId + ', ' + this.url + ', ' + this.fieldNames);
}

Table.prototype = {
    constructor: Table,

    populateTable:function(date) {

		var self = this;

		var addRecord = function(event) {
			var record = {};
			for (i in self.fieldNames) {
				record[self.fieldNames[i]] = $('.field-input-new.' + getFieldClassName(self.fieldNames[i])).val();
			}
			record['date'] = getCurrentDate();

			console.log(record);

			$.ajax({
				type: 'POST',
				data: record,
				url: self.accessPoint,
				dataType: 'JSON'
			}).done(function( response ) {
				// Check for successful (blank) response
				if (response.msg === '') {
//					$('#addUser fieldset input').val('');	// Clear the form inputs
					console.log(response.id);
					record._id = response.id;
					var table = getTable(self.tableId);
					var row = table.insertRow(table.rows.length - 1);
					console.log(record);
					row.innerHTML = self.dataToRow(record);
					self.setEditAction(row);
					self.setAutoCompleteAll();
				} else {
					// If something goes wrong, alert the error message that our service returned
//					alert('Error: ' + response.msg);
				}
			});
		};

		// Empty content string
		var tableContent = '';

		// jQuery AJAX call for JSON
		$.getJSON(this.accessPoint + encodeURI(date) , function( data ) {

			// For each item in our JSON, add a table row and cells to the content string
			$.each(data, function(){
				tableContent += '<tr>';
				tableContent += self.dataToRow(this);
				tableContent += '</tr>';
			});

			var record = {
				num : '222',
				pigId : 'Y 39-12',
				motherStatus : '이유모돈',
				batch : '2산',
				daysSinceStopBreastFeed : '5일',
				administration1 : '정액1차',
				administration2 : '정액2차',
				administration3 : '정액3차',
				administrator : '라유',
				status : '완료'
			};

			tableContent += '<tr><td></td>';
			for (i in self.fieldNames) {
				tableContent += generateFieldNew(self.fieldNames[i], record[self.fieldNames[i]]);
			}
			tableContent += '<td><button class="btn btn-primary" id="addButton">추가</button></td></tr>';
			
			// Inject the whole content string into our existing HTML table
//			$('#userList table tbody').html(tableContent);
			$(self.tableId).append(tableContent);

			$('#addButton').on('click', addRecord);

			self.setEditAction();
			self.setAutoCompleteAll();
		});
	},

	setEditAction:function(row) {

		var self = this;

		(row ? $(row).find('.field') : $('.field')).click(function() {
			$(this).find('label').hide();
			$(this).find('input[type="text"]').show().focus();
//			console.log(getIdFromRowJQ($(this).parent().parent()));
		});

		(row ? $(row).find('.field-input') : $('.field-input')).focusout(function() {
			var field = $(this).parent();
			$(this).hide();
			field.find('label').show();
			var cell = field.parent();
			var row = cell.parent();
//			var col = row.children().index(cell);
//			console.log(col);
//			console.log(getHeaderCell(col).getAttribute('rel'));
			var fieldName = cell[0].getAttribute('rel');
//			console.log(fieldName);
			var value = $(this).val();
			var record = {};
			record[fieldName] = value;
			console.log(record);
			$.ajax({
				type : 'POST',
				data : record,
				url : self.accessPoint + getIdFromRowJQ(row),
				dataType: 'JSON'
			}).done(function(res) {
				console.log(value);
				field.find('label').html(value);
			});
		});
	},

	setAutoCompleteAll:function() {
		for (i in this.fieldNames) {
			setAutoComplete(this.accessPoint, this.fieldNames[i]);
		}
	},

	dataToRow:function(data) {
		var rowContent = '';
		rowContent += '<td>' + data._id + '</td>';
		for (i in this.fieldNames) {
			rowContent += generateField(this.fieldNames[i], data[this.fieldNames[i]]);
		}
		rowContent += '	<td class="text-right">';
		rowContent += this.getOptionMenu(data._id);
		rowContent += '	</td>';
//		console.log(rowContent);
		return rowContent;
	},

	getOptionMenu:function(recordId) {
		var optionMenu =
			'		<div class="btn-group">'+
			'			<a href="#" data-toggle="dropdown" class="dropdown-toggle">'+
			'				<i class="fa fa-pencil"></i>'+
			'			</a>'+
			'			<ul class="dropdown-menu pull-right">'+
			'				<li><a href="#" onclick="deleteRow(\'' + this.tableId + '\', \'' + this.accessPoint + '\', \'' + recordId + '\');">삭제</a></li>'+
			'				<li><a href="#">Another action</a></li>'+
			'				<li><a href="#">Something else here</a></li>'+
			'				<li class="divider"></li>'+
			'				<li><a href="#">Separated link</a></li>'+
			'			</ul>'+
			'		</div>';
		return optionMenu;
	}
};

$(document).ready(function() {
	var tables = [
		new Table(
			'#fertilization',
			'/task/fertilization/',
			[
				'num',
				'pigId',
				'motherStatus',
				'batch',
				'daysSinceStopBreastFeed',
				'administration1',
				'administration2',
				'administration3',
				'administrator',
				'status'
			]
		),
	];

	tables[0].populateTable(getCurrentDate());

	$('#date-selector').on('changeDate', function(d) {
		console.log(d); // Do not use this!! It returns local midnight, which is not what we want!!!
		var date = new Date(getCurrentDate());
		console.log(date);
		if (d.viewMode == "days") {
			$('#date-selector').datepicker('hide');
			$('#fertilization').empty();
			tables[0].populateTable(date);
		}
	});
});
