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

function populateTable() {

	// Empty content string
	var tableContent = '';

	// jQuery AJAX call for JSON
	$.getJSON( '/task/fertilization', function( data ) {

		// For each item in our JSON, add a table row and cells to the content string
		$.each(data, function(){
			tableContent += '<tr>';
			tableContent += '	<td>' + this.num + '</td>';
			tableContent += '	<td>' + this.pigId + '</td>';
			tableContent += '	<td>이유모돈</td>';
			tableContent += '	<td>2산</td>';
			tableContent += '	<td>5일</td>';
			tableContent += '	<td>정액1차</td>';
			tableContent += '	<td>정액2차</td>';
			tableContent += '	<td>정액3차</td>';
			tableContent += '	<td>라유</td>';
			tableContent += '	<td>완료</td>';
			tableContent += '	<td class="text-right">';
			tableContent += getOptionMenu();
			tableContent += '	</td>';
		});
		
		// Inject the whole content string into our existing HTML table
//		$('#userList table tbody').html(tableContent);
		$('#fertilization').append(tableContent);
	});
};

$(document).ready(function() {
	populateTable();
});
