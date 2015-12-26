function getTable() {
	return $('#fertilization').parent()[0];
}

function getIdFromRow(row) {
	return row.cells.item(0).innerHTML;
}

function getRow(id) {
	var table = getTable();
//	console.log(table.rows);
	for (var i = 0, row; row = table.rows[i]; i++) {
//		console.log(getIdFromRow(row));
		if (getIdFromRow(row) == id)
			return row;
	}
	return null;
}

function deleteRow(id) {
	console.log(id);
	$.ajax({
		type : 'DELETE',
		url : '/task/fertilization/' + id
	}).done(function(res) {
		console.log('deleted ' + id);
		var row = getRow(id);
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

function getOptionMenu(id) {
	var optionMenu = 
		'		<div class="btn-group">'+
		'			<a href="#" data-toggle="dropdown" class="dropdown-toggle">'+
		'				<i class="fa fa-pencil"></i>'+
		'			</a>'+
		'			<ul class="dropdown-menu pull-right">'+
		'				<li><a href="#" onclick="deleteRow(\'' + id + '\');">삭제</a></li>'+
		'				<li><a href="#">Another action</a></li>'+
		'				<li><a href="#">Something else here</a></li>'+
		'				<li class="divider"></li>'+
		'				<li><a href="#">Separated link</a></li>'+
		'			</ul>'+
		'		</div>';
	return optionMenu;
}

function generateField(data) {
	var field = '';
	field += '<td><div class="field">';
	field += '	<label>' + data + '</label>';
	field += '	<input type="text" class="form-control field-input" value="' + data + '" />';
	field += '</div></td>';
	return field;
}

function generateFieldNew(fieldName, data) {
	var field = '';
	field += '<td><div class="field-new">';
	field += '	<input type="text" class="form-control field-input-new" id="' + fieldName + 'Field" value="' + data + '" />';
	field += '</div></td>';
	return field;
}

function fertilizationDataToRow(data) {
	var rowContent = '';
	rowContent += '<td>' + data._id + '</td>';
	rowContent += generateField(data.num);
	rowContent += generateField(data.pigId);
	rowContent += generateField(data.motherStatus);
	rowContent += generateField(data.batch);
	rowContent += generateField(data.daysSinceStopBreastFeed);
	rowContent += generateField(data.administration1);
	rowContent += generateField(data.administration2);
	rowContent += generateField(data.administration3);
	rowContent += generateField(data.administrator);
	rowContent += generateField(data.status);
	rowContent += '	<td class="text-right">';
	rowContent += getOptionMenu(data._id);
	rowContent += '	</td>';
	console.log(rowContent);
	return rowContent;
}

function addFertilization(event) {
	var record = {
		num : $('#numField').val(),
		pigId : $('#pigIdField').val(),
		motherStatus : $('#motherStatusField').val(),
		batch : $('#batchField').val(),
		daysSinceStopBreastFeed : $('#daysSinceStopBreastFeedField').val(),
		administration1 : $('#administration1Field').val(),
		administration2 : $('#administration2Field').val(),
		administration3 : $('#administration3Field').val(),
		administrator : $('#administratorField').val(),
		status : $('#statusField').val()
	}
	
//	console.log(record);
	
	$.ajax({
		type: 'POST',
		data: record,
		url: '/task/fertilization',
		dataType: 'JSON'
	}).done(function( response ) {
		// Check for successful (blank) response
		if (response.msg === '') {
//			$('#addUser fieldset input').val('');	// Clear the form inputs
			console.log(response.id);
			record._id = response.id;
			var table = getTable();
			var row = table.insertRow(table.rows.length - 1);
			console.log(record);
			row.innerHTML = fertilizationDataToRow(record);
		} else {
			// If something goes wrong, alert the error message that our service returned
//			alert('Error: ' + response.msg);
		}
	});
}

function populateTable() {

	// Empty content string
	var tableContent = '';

	// jQuery AJAX call for JSON
	$.getJSON( '/task/fertilization', function( data ) {

		// For each item in our JSON, add a table row and cells to the content string
		$.each(data, function(){
			tableContent += '<tr>';
			tableContent += fertilizationDataToRow(this);
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
		tableContent += generateFieldNew('num', record.num);
		tableContent += generateFieldNew('pigId', record.pigId);
		tableContent += generateFieldNew('motherStatus', record.motherStatus);
		tableContent += generateFieldNew('batch', record.batch);
		tableContent += generateFieldNew('daysSinceStopBreastFeed', record.daysSinceStopBreastFeed);
		tableContent += generateFieldNew('administration1', record.administration1);
		tableContent += generateFieldNew('administration2', record.administration2);
		tableContent += generateFieldNew('administration3', record.administration3);
		tableContent += generateFieldNew('administrator', record.administrator);
		tableContent += generateFieldNew('status', record.status);
		tableContent += '<td><button class="btn btn-primary" id="addButton">추가</button></td></tr>';
		
		// Inject the whole content string into our existing HTML table
//		$('#userList table tbody').html(tableContent);
		$('#fertilization').append(tableContent);
		
		$('#addButton').on('click', addFertilization);
		
		$('.field').click(function () {
			$(this).find('label').hide();
			$(this).find('input[type="text"]').show().focus();
			var _id = $(this).parent().parent().find('td:nth-child(1)').html();
			console.log(_id);
		});
		
		$('.field-input').focusout(function() {
			var dad = $(this).parent();
			$(this).hide();
			dad.find('label').show();
		});

		var availableTags = [
			"ActionScript",
			"AppleScript",
			"Asp",
			"BASIC",
			"C",
			"C++",
			"Clojure",
			"COBOL",
			"ColdFusion",
			"Erlang",
			"Fortran",
			"Groovy",
			"Haskell",
			"Java",
			"JavaScript",
			"Lisp",
			"Perl",
			"PHP",
			"Python",
			"Ruby",
			"Scala",
			"Scheme"
		];
		$('.field-input').autocomplete({
			source: availableTags
		});
		$('.field-input-new').autocomplete({
			source: availableTags
		});
	});
};

$(document).ready(function() {
	populateTable();
});
