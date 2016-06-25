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

function generateField(fieldName, data) {
	var field = '';
	field += '<td rel="' + fieldName + '"><div class="field">';
	field += '	<label>' + data + '</label>';
	field += '	<input type="text" class="form-control field-input" value="' + data + '" />';
	field += '</div></td>';
	return field;
}

function generateFieldAux(fieldName) {
	var field = '';
	field += '<td rel="' + fieldName + '"><div>';
	field += '	<label></label>';
	field += '</div></td>';
	return field;
}

function generateFieldNew(fieldName, data) {
	var field = '';
	field += '<td rel="' + norm(fieldName) + '"><div>';
	field += '	<input type="text" class="form-control field-input-new" value="' + data + '" />';
	field += '</div></td>';
	return field;
}

function norm(fieldName) {
	if (fieldName.startsWith('-') || fieldName.startsWith('+') || fieldName.startsWith('='))
		return fieldName.substr(1);
	else
		return fieldName;
}

var isArray = function(o) {
	return Object.prototype.toString.call(o) === '[object Array]';
}

function Table(tableId, accessPoint, fieldNames, accessPointAux) {
	this.tableId = tableId;
	this.accessPoint = accessPoint;
	this.fieldNames = fieldNames;
	this.accessPointAux = accessPointAux;
//	console.log(this.tableId + ', ' + this.url + ', ' + this.fieldNames);
}

Table.prototype = {
    constructor: Table,

    populateTable:function(date) {

		var self = this;

		// Empty content string
		var tableContent = '';

		// jQuery AJAX call for JSON
		$.getJSON(this.accessPoint + encodeURI(date) , function( data ) {

			$(self.tableId).empty();

			// For each item in our JSON, add a table row and cells to the content string
			$.each(data, function(){
				tableContent += '<tr>';
				tableContent += self.dataToRow(this);
				tableContent += '</tr>';
			});

			// Inject the whole content string into our existing HTML table
//			$('#userList table tbody').html(tableContent);
			$(self.tableId).append(tableContent);

			$.each(data, function(){
				var row = $(getRow(self.tableId, this._id));
				var ref = self.getRefJoinField(row);
				if (ref) {
//					self.fillReferenceData(row, ref.find('label').html());
					ref.on('focusin', function() {self.clearReferenceData(row);});
					ref.on('focusout', function() {self.fillReferenceData(row, $(this).find('input').val());});
				}
			});

//			self.setEditAction();

			self.addLastRowForAddingNewRecord();
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

	setAutoComplete:function(accessPoint, fieldName) {
		var self = this;
		$.getJSON(accessPoint + 'field/' + fieldName, function(data) {
			self.getFieldSet(fieldName).each(function() {
				$(this).find('input').autocomplete({
					source: data
				});
			});
		});
	},

	setAutoCompleteAll:function() {
		for (i in this.fieldNames) {
			var fieldName = this.fieldNames[i];
			if (fieldName.startsWith('+'))
				this.setAutoComplete(this.accessPointAux, fieldName.substr(1));
			else if (fieldName.startsWith('-') || fieldName.startsWith('='))
				continue;
			else
				this.setAutoComplete(this.accessPoint, fieldName);
		}
	},

	getField2:function(row, fieldName) {
		return row.find('td[rel="' + norm(fieldName) + '"]');
	},

	getFieldSet:function(fieldName) {
		return $(this.tableId).find('td[rel="' + norm(fieldName) + '"]');
	},

	getRefJoinField:function(row) {
		for (i in this.fieldNames) {
			var fieldName = this.fieldNames[i];
			if (fieldName.startsWith('+')) {
				var field = this.getField2(row, fieldName)
//				console.log(field);
				return field;
			}
		}
		return null;
	},

	clearReferenceData:function(row) {
		for (i in this.fieldNames) {
			var fieldName = this.fieldNames[i];
			if (fieldName.startsWith('-'))
				this.getField2(row, fieldName).find('label').html('');
			else if (fieldName.startsWith('='))
				; // todo

		}
	},

	fillReferenceData:function(row, ref) {
//		console.log(row);
//		console.log(ref);
		var self = this;
		$.getJSON(this.accessPointAux + encodeURI(ref) , function( data ) {
			console.log(data);
			Object.keys(data).forEach(function(key,index) {
//				console.log(data[key]);
//				console.log(self.getField2(row, key));
				if (isArray(data[key]))
					self.getField2(row, key).find('input').autocomplete({ source: data[key] });
				else
					self.getField2(row, key).find('label').html(data[key]);
			});
		});
	},

	addLastRowForAddingNewRecord: function() {

		var self = this;

		var addRecord = function(event) {
			var record = {};
			var newRow = self.getNewRow()
			for (i in self.fieldNames) {
				var fieldName = self.fieldNames[i];
				if (fieldName.startsWith('-'))
					record[fieldName.substr(1)] = self.getField2(newRow, fieldName).find('label').html();
				else if (fieldName.startsWith('+') || fieldName.startsWith('='))
					record[fieldName.substr(1)] = self.getField2(newRow, fieldName).find('input').val();
				else
					record[fieldName] = self.getField2(newRow, fieldName).find('input').val();
			}
			record['date'] = getCurrentDate();

//			console.log(record);

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

					var ref = self.getRefJoinField($(row));
					if (ref) {
//						self.fillReferenceData($(row), ref.find('label').html());
						ref.on('focusin', function() {self.clearReferenceData($(row));});
						ref.on('focusout', function() {self.fillReferenceData($(row), $(this).find('input').val());});
					}

//					self.setEditAction(row);
					self.setAutoCompleteAll();

					var newRow = self.getNewRow();
					self.fillReferenceData(newRow, self.getRefJoinField(newRow).find('input').val());
				} else {
					// If something goes wrong, alert the error message that our service returned
//					alert('Error: ' + response.msg);
				}
			});
		};

		var createNewRow = function(record) {
			var tableContent = '<tr rel="new"><td></td>';
			for (i in self.fieldNames) {
				var fieldName = self.fieldNames[i];
				if (fieldName.startsWith('-'))
					tableContent += generateFieldAux(fieldName.substr(1));
				else if (fieldName.startsWith('+') || fieldName.startsWith('='))
					tableContent += generateFieldNew(fieldName, '');
				else
					tableContent += generateFieldNew(fieldName, (record ? record[fieldName] : ''));
			}
			tableContent += '<td><button class="btn btn-primary" id="addButton">추가</button></td></tr>';

			$(self.tableId).append(tableContent);

			var row = self.getNewRow();
			var ref = self.getRefJoinField(row);
			if (ref) {
				ref.on('focusin', function() {self.clearReferenceData(row);});
				ref.on('focusout', function() {self.fillReferenceData(row, $(this).find('input').val());});
			}

			$(self.tableId).find('#addButton').on('click', addRecord);
		}

		$.getJSON(this.accessPoint + 'last' , function( data ) {
			var record = data[0];
			createNewRow(record);
		});

//		createNewRow();
	},

	getNewRow:function() {
		return $(this.tableId).find('tr[rel="new"]');
	},

	dataToRow:function(data) {
//		console.log(data);
		var rowContent = '';
		rowContent += '<td>' + data._id + '</td>';
		for (i in this.fieldNames) {
			var fieldName = this.fieldNames[i];
			if (fieldName.startsWith('-'))
//				rowContent += generateFieldAux(fieldName.substr(1));
				rowContent += generateField(fieldName.substr(1), data[fieldName.substr(1)]);
			else if (fieldName.startsWith('+'))
				rowContent += generateField(fieldName.substr(1), data[fieldName.substr(1)]);
			else if (fieldName.startsWith('='))
				rowContent += generateField(fieldName.substr(1), data[fieldName.substr(1)]);
			else
				rowContent += generateField(fieldName, data[fieldName]);
//			rowContent += '\n';
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

var initializeTables = function(tables) {
	for (i in tables) {
		tables[i].populateTable(getCurrentDate());
	}

	$('#date-selector').on('changeDate', function(d) {
		console.log(d); // Do not use this!! It returns local midnight, which is not what we want!!!
		var date = new Date(getCurrentDate());
		console.log(date);
		if (d.viewMode == "days") {
			$('#date-selector').datepicker('hide');
			for (i in tables) {
				tables[i].populateTable(date);
			}
		}
	});
};
