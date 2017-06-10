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

function generateFieldForListing(fieldSpec, data) {
	const fieldName = getFieldName(fieldSpec);
	if (fieldSpec.startsWith('+'))
		return generateFieldNormal(fieldName, data[fieldName]);
	else if (fieldSpec.startsWith('-'))
		return generateFieldReadOnly(fieldName, data[fieldName]);
	else if (fieldSpec.startsWith('='))
		return generateFieldNormal(fieldName, data[fieldName]);
	else if (fieldSpec.startsWith('*'))
		return generateFieldNormal(fieldName, data[fieldName]);
	else
		return generateFieldNormal(fieldName, data[fieldName]);
}

function generateFieldForNewRow(fieldSpec, record) {
	const fieldName = getFieldName(fieldSpec);
	if (fieldSpec.startsWith('+'))
		return generateFieldNew(fieldName, '');
	else if (fieldSpec.startsWith('-'))
		return generateFieldReadOnly(fieldName, '');
	else if (fieldSpec.startsWith('='))
		return generateFieldNew(fieldName, '');
	else if (fieldSpec.startsWith('*'))
		return generateFieldNew(fieldName, '');
	else
		return generateFieldNew(fieldName, (record ? record[fieldName] : ''));
}

function extractFieldValue(fieldSpec, field) {
	if (fieldSpec.startsWith('-'))
		return field.find('label').html();
	else if (fieldSpec.startsWith('+') || fieldSpec.startsWith('='))
		return field.find('input').val();
	else
		return field.find('input').val();
}

function generateFieldNormal(fieldName, value) {
	var field = '';
	field += '<td rel="' + fieldName + '"><div class="field">';
	field += '	<label>' + value + '</label>';
	field += '	<input type="text" class="form-control field-input" value="' + value + '" />';
	field += '</div></td>';
	return field;
}

function generateFieldReadOnly(fieldName, value) {
	var field = '';
	field += '<td rel="' + fieldName + '"><div>';
	field += '	<label>' + value + '</label>';
	field += '</div></td>';
	return field;
}

function generateFieldNew(fieldName, initialValue) {
	var field = '';
	field += '<td rel="' + fieldName + '"><div>';
	field += '	<input type="text" class="form-control field-input-new" value="' + initialValue + '" />';
	field += '</div></td>';
	return field;
}

function getFieldName(fieldSpec) {
	if (fieldSpec.startsWith('+') || fieldSpec.startsWith('-') || fieldSpec.startsWith('=') || fieldSpec.startsWith('*'))
		return fieldSpec.substr(1).split(':')[0];
	else
		return fieldSpec;
}

function getFieldNameRef(fieldSpec) {
	if (fieldSpec.startsWith('+') || fieldSpec.startsWith('-') || fieldSpec.startsWith('=') || fieldSpec.startsWith('*')) {
		var tokens = fieldSpec.substr(1).split(':');
		return tokens[1] ? tokens[1] : tokens[0];
	} else {
		return fieldSpec;
	}
}

var isArray = function(o) {
	return Object.prototype.toString.call(o) === '[object Array]';
}

function Table(tableId, accessPoint, fieldSpecs, accessPointAux, onAddEntry, onEditEntry, onRemoveEntry) {
	this.tableId = tableId;
	this.accessPoint = accessPoint;
	this.fieldSpecs = fieldSpecs;
	this.accessPointAux = accessPointAux;
	this.onAddEntry = onAddEntry;
	this.onEditEntry = onEditEntry;
	this.onRemoveEntry = onRemoveEntry;
//	console.log(this.tableId + ', ' + this.url + ', ' + this.fieldSpecs);
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
					// self.fillReferenceData(row, ref.find('label').html());
					// ref.on('focusin', function() {self.clearReferenceData(row);});
					// ref.on('focusout', function() {self.fillReferenceData(row, $(this).find('input').val());});
				}
			});

			var table = getTable(self.tableId);
			for (var i = 0, row; row = table.rows[i]; i++) {
				$(row.cells[row.cells.length - 1]).find('.menu-item-delete').on('click', function(event) {
					const recordId = getIdFromRowJQ($(event.target).closest('tr'));
					console.log(self.accessPoint, self.tableId, recordId);
					self.removeEntry(recordId);
				});
			}

//			self.setEditAction();

			self.addLastRowForAddingNewRecord();
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
		$.getJSON(accessPoint, function(data) {
			for (var i in data)
				if (data[i] == null)
					data[i] = '';
			self.getFieldSet(fieldName).each(function() {
				var input = $(this).find('input');
				input.autocomplete({
					source: data,
					minLength: 0
				});
				input.focusin(function() {
					console.log(this);
					$(this).autocomplete('search', '');
				});
				if (input.is(':focus'))
					input.autocomplete('search', '');
			});
		});
	},

	setAutoCompleteAll:function() {
		for (i in this.fieldSpecs) {
			var fieldSpec = this.fieldSpecs[i];
			if (fieldSpec.startsWith('+') || fieldSpec.startsWith('*'))
				this.setAutoComplete(this.accessPointAux + 'field/' + getFieldNameRef(fieldSpec), getFieldName(fieldSpec));
			else if (fieldSpec.startsWith('-') || fieldSpec.startsWith('='))
				;
			else
				this.setAutoComplete(this.accessPoint + 'field/' + getFieldName(fieldSpec), getFieldName(fieldSpec));
		}
	},

	getField2:function(row, fieldSpec) {
		return row.find('td[rel="' + getFieldName(fieldSpec) + '"]');
	},

	getFieldSet:function(fieldSpec) {
		return $(this.tableId).find('td[rel="' + getFieldName(fieldSpec) + '"]');
	},

	getRefJoinField:function(row) {
		for (i in this.fieldSpecs) {
			var fieldSpec = this.fieldSpecs[i];
			if (fieldSpec.startsWith('+')) {
				var field = this.getField2(row, fieldSpec)
//				console.log(field);
				return field;
			}
		}
		return null;
	},

	clearReferenceData:function(row) {
		for (i in this.fieldSpecs) {
			var fieldSpec = this.fieldSpecs[i];
			if (fieldSpec.startsWith('-')) {
				this.getField2(row, fieldSpec).find('label').html('');
			} else if (fieldSpec.startsWith('=')) {
				// todo: clear field value also
				var input = this.getField2(row, fieldSpec).find('input');
				input.autocomplete({
					source: []
				});
			}
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
				if (isArray(data[key])) {
					var input = self.getField2(row, key).find('input');
					input.autocomplete({
						source: data[key],
						minLength: 0
					});
					input.focusin(function() {
						$(this).autocomplete('search', '');
					});
					if (input.is(':focus'))
						input.autocomplete('search', '');
				} else {
					self.getField2(row, key).find('label').html(data[key]);
				}
			});
		});
	},

	addLastRowForAddingNewRecord: function() {

		var self = this;

		var addRecord = function(event) {
			var record = {};
			var newRow = self.getNewRow()
			for (i in self.fieldSpecs) {
				var fieldSpec = self.fieldSpecs[i];
				record[getFieldName(fieldSpec)] = extractFieldValue(fieldSpec, self.getField2(newRow, fieldSpec));
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
						// self.fillReferenceData($(row), ref.find('label').html());
						// ref.on('focusin', function() {self.clearReferenceData($(row));});
						// ref.on('focusout', function() {self.fillReferenceData($(row), $(this).find('input').val());});
					}

					$(row.cells[row.cells.length - 1]).find('.menu-item-delete').on('click', function(event) {
						const recordId = getIdFromRowJQ($(event.target).closest('tr'));
						console.log(self.accessPoint, self.tableId, recordId);
						self.removeEntry(recordId);
					});

//					self.setEditAction(row);
					self.setAutoCompleteAll();

					var newRow = self.getNewRow();
					var refJoinField = self.getRefJoinField(newRow);
					if (refJoinField)
						self.fillReferenceData(newRow, refJoinField.find('input').val());
				} else {
					// If something goes wrong, alert the error message that our service returned
//					alert('Error: ' + response.msg);
				}
				if (self.onAddEntry)
					self.onAddEntry(record._id);
			});
		};

		var createNewRow = function(record) {
			var tableContent = '<tr rel="new"><td></td>';
			for (i in self.fieldSpecs) {
				tableContent += generateFieldForNewRow(self.fieldSpecs[i], record);
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
			self.setAutoCompleteAll();
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
		for (i in this.fieldSpecs) {
			rowContent += generateFieldForListing(this.fieldSpecs[i], data);
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
			'				<li><a href="#" class="menu-item-delete">삭제</a></li>'+
			'				<li><a href="#">Another action</a></li>'+
			'				<li><a href="#">Something else here</a></li>'+
			'				<li class="divider"></li>'+
			'				<li><a href="#">Separated link</a></li>'+
			'			</ul>'+
			'		</div>';
		return optionMenu;
	},

	removeEntry:function(recordId) {
		console.log(recordId);
		var self = this;
		$.ajax({
			type : 'DELETE',
			url : this.accessPoint + recordId
		}).done(function(res) {
			console.log('deleted ' + recordId);
			var row = getRow(self.tableId, recordId);
			console.log(row);
			for (var j = 0, cell; cell = row.cells[j]; j++) {
				cell.style.cssText = "background-color:LightCyan";
				var label = cell.childNodes[0].childNodes[1];
				if (label) {
//	 				label.style.setProperty("text-decoration", "line-through");
					label.style.cssText = "text-decoration:line-through; color:LightSteelBlue; ";
				}
			}
			if (self.onRemoveEntry)
				self.onRemoveEntry(recordId);
		});
		return false;
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

var isArray = function(o) {
	return Object.prototype.toString.call(o) === '[object Array]';
}

var complexDataToRows = function(data){

	var rows = new Array();

	for (var property in data) {
		if (!data.hasOwnProperty(property))
			continue;
		var p = data[property];
//		console.log(p);

		if (isArray(p)) {
			console.log(property + ' is array');
			for (var i = 0; i < p.length; i++) {
				rows = rows.concat(complexDataToRows(p[i]));
//				console.log(complexDataToRows(p[i]));
			}
//			console.log(rows);
			break;
		}
	}

//	console.log(rows);

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

//	console.log(r);

	rows[0] = r;

//	console.log(rows);

	return rows;
}

var loadTable = function(tableId, accessPoint, date) {

	var tableContent = '';

	$.getJSON(accessPoint + (date ? encodeURI(date) : ''), function( data ) {

		$(tableId).empty();

		$.each(data, function() {
			for (var property in this) {
				if (!this.hasOwnProperty(property))
					continue;
//				console.log(property);
			}
//			tableContent += '<tr><td></td>';
//			tableContent += '<td><pre>' + JSON.stringify(this, null, ' ') + '</pre></td><td></td><td></td><td></td>';
//			tableContent += '</tr>';

			var rows = complexDataToRows(this);
			for (var i = 0; i < rows.length; i++) {
				tableContent += '<tr>' + rows[i] + '<td></td></tr>';
			}
			console.log(rows);
		});

		$(tableId).append(tableContent);

//		console.log(tableContent);
	});
}
