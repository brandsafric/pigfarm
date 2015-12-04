function getOptionMenu() {
	var optionMenu = 
		'		<div class="btn-group">'+
		'			<a href="#" data-toggle="dropdown" class="dropdown-toggle">'+
		'				<i class="fa fa-pencil"></i>'+
		'			</a>'+
		'			<ul class="dropdown-menu pull-right">'+
		'				<li><a href="#">Action</a></li>'+
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

function generateFieldNew(data) {
	var field = '';
	field += '<td><div class="field-new">';
	field += '	<input type="text" class="form-control" value="' + data + '" />';
	field += '</div></td>';
	return field;
}

function generateFieldPig(data) {
	var field = '';
	field += '<td>';
	field += '	<input id="tags" class="form-control">';
	field += '</td>';
	return field;
}

function populateTable() {

	// Empty content string
	var tableContent = '';

	// jQuery AJAX call for JSON
	$.getJSON( '/task/fertilization', function( data ) {

		// For each item in our JSON, add a table row and cells to the content string
		$.each(data, function(){
			tableContent += '<tr><td>' + this._id + '</td>';
			tableContent += generateField(this.num);
			tableContent += generateField(this.pigId);
			tableContent += generateField(this.motherStatus);
			tableContent += generateField(this.batch);
			tableContent += generateField(this.daysSinceStopBreastFeed);
			tableContent += generateField(this.administration1);
			tableContent += generateField(this.administration2);
			tableContent += generateField(this.administration3);
			tableContent += generateField(this.administrator);
			tableContent += generateField(this.status);
			tableContent += '	<td class="text-right">';
			tableContent += getOptionMenu();
			tableContent += '	</td></tr>';
		});
		
		tableContent += '<tr><td>' + this._id + '</td>';
		tableContent += generateFieldPig();
		for (i = 0; i < 9; i++) {
			tableContent += generateFieldNew('hi');
		}
		tableContent += '<td><button type="submit" class="btn btn-primary">추가</button></td></tr>';
		
		// Inject the whole content string into our existing HTML table
//		$('#userList table tbody').html(tableContent);
		$('#fertilization').append(tableContent);
		
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
		$( "#tags" ).autocomplete({
			source: availableTags
		});
	});
};

$(document).ready(function() {
	populateTable();
});
