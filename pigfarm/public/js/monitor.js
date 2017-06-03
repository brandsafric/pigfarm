function makeSimpleChart() {
	var chart = '';
	
	chart += '<div class="col-md-6">';
	chart += '	<section class="panel">';
	chart += '		<header class="panel-heading font-bold">Site statistics</header>';
	chart += '		<div class="panel-body">';
	chart += '			<div id="flot-color" style="height: 250px; padding: 0px; position: relative;">';
	chart += '				<canvas class="flot-base" width="2240" height="500" style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 1120px; height: 250px;"></canvas>';
	chart += '				<div class="flot-text" style="position: absolute; top: 0px; left: 0px; bottom: 0px; right: 0px; font-size: smaller; color: rgb(84, 84, 84);">';
	chart += '					<div class="flot-x-axis flot-x1-axis xAxis x1Axis" style="position: absolute; top: 0px; left: 0px; bottom: 0px; right: 0px; display: block;">';
	chart += '						<div class="flot-tick-label tickLabel" style="position: absolute; max-width: 93px; top: 235px; left: 15px; text-align: center;">0</div>';
	chart += '						<div class="flot-tick-label tickLabel" style="position: absolute; max-width: 93px; top: 235px; left: 114px; text-align: center;">1</div>';
	chart += '						<div class="flot-tick-label tickLabel" style="position: absolute; max-width: 93px; top: 235px; left: 213px; text-align: center;">2</div>';
	chart += '						<div class="flot-tick-label tickLabel" style="position: absolute; max-width: 93px; top: 235px; left: 312px; text-align: center;">3</div>';
	chart += '						<div class="flot-tick-label tickLabel" style="position: absolute; max-width: 93px; top: 235px; left: 411px; text-align: center;">4</div>';
	chart += '						<div class="flot-tick-label tickLabel" style="position: absolute; max-width: 93px; top: 235px; left: 510px; text-align: center;">5</div>';
	chart += '						<div class="flot-tick-label tickLabel" style="position: absolute; max-width: 93px; top: 235px; left: 610px; text-align: center;">6</div>';
	chart += '						<div class="flot-tick-label tickLabel" style="position: absolute; max-width: 93px; top: 235px; left: 709px; text-align: center;">7</div>';
	chart += '						<div class="flot-tick-label tickLabel" style="position: absolute; max-width: 93px; top: 235px; left: 808px; text-align: center;">8</div>';
	chart += '						<div class="flot-tick-label tickLabel" style="position: absolute; max-width: 93px; top: 235px; left: 907px; text-align: center;">9</div>';
	chart += '						<div class="flot-tick-label tickLabel" style="position: absolute; max-width: 93px; top: 235px; left: 1002px; text-align: center;">10</div>';
	chart += '						<div class="flot-tick-label tickLabel" style="position: absolute; max-width: 93px; top: 235px; left: 1102px; text-align: center;">11</div>';
	chart += '					</div>';
	chart += '					<div class="flot-y-axis flot-y1-axis yAxis y1Axis" style="position: absolute; top: 0px; left: 0px; bottom: 0px; right: 0px; display: block;">';
	chart += '						<div class="flot-tick-label tickLabel" style="position: absolute; top: 223px; left: 7px; text-align: right;">0</div>';
	chart += '						<div class="flot-tick-label tickLabel" style="position: absolute; top: 179px; left: 7px; text-align: right;">5</div>';
	chart += '						<div class="flot-tick-label tickLabel" style="position: absolute; top: 135px; left: 0px; text-align: right;">10</div>';
	chart += '						<div class="flot-tick-label tickLabel" style="position: absolute; top: 92px; left: 0px; text-align: right;">15</div>';
	chart += '						<div class="flot-tick-label tickLabel" style="position: absolute; top: 48px; left: 0px; text-align: right;">20</div>';
	chart += '						<div class="flot-tick-label tickLabel" style="position: absolute; top: 5px; left: 0px; text-align: right;">25</div>';
	chart += '					</div>';
	chart += '				</div>';
	chart += '				<canvas class="flot-overlay" width="2240" height="500" style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 1120px; height: 250px;"></canvas>';
	chart += '			</div>';
	chart += '		</div>';
	chart += '		<footer class="panel-footer">';
	chart += '			<div class="row text-center">';
	chart += '				<div class="col-xs-3 b-r">';
	chart += '					<p class="h3 font-bold m-t">5,860</p>';
	chart += '					<p class="text-muted">Orders</p>';
	chart += '				</div>';
	chart += '				<div class="col-xs-3 b-r">';
	chart += '					<p class="h3 font-bold m-t">10,450</p>';
	chart += '					<p class="text-muted">Selling Items</p>';
	chart += '				</div>';
	chart += '				<div class="col-xs-3 b-r">';
	chart += '					<p class="h3 font-bold m-t">21,230</p>';
	chart += '					<p class="text-muted">Items</p>';
	chart += '				</div>';
	chart += '				<div class="col-xs-3">';
	chart += '					<p class="h3 font-bold m-t">7,230</p>';
	chart += '					<p class="text-muted">Customers</p>';
	chart += '				</div>';
	chart += '			</div>';
	chart += '		</footer>';
	chart += '	</section>';
	chart += '</div>';
	
	return chart;
}

function makeRealTimeUpdateChart() {
	var chart = '';
	
	chart += '<div class="col-md-6">';
	chart += '	<section class="panel">';
	chart += '		<header class="panel-heading font-bold">Real-time update</header>';
	chart += '		<div class="panel-body">';
	chart += '			<div id="flot-live" style="height: 240px; padding: 0px; position: relative;">';
	chart += '				<canvas class="flot-base" width="1058" height="480" style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 529px; height: 240px;"></canvas>';
	chart += '				<div class="flot-text" style="position: absolute; top: 0px; left: 0px; bottom: 0px; right: 0px; font-size: smaller; color: rgb(84, 84, 84);">';
	chart += '					<div class="flot-y-axis flot-y1-axis yAxis y1Axis" style="position: absolute; top: 0px; left: 0px; bottom: 0px; right: 0px; display: block;">';
	chart += '						<div class="flot-tick-label tickLabel" style="position: absolute; top: 225px; left: 13px; text-align: right;">0</div>';
	chart += '						<div class="flot-tick-label tickLabel" style="position: absolute; top: 180px; left: 6px; text-align: right;">5</div>';
	chart += '						<div class="flot-tick-label tickLabel" style="position: absolute; top: 135px; left: 6px; text-align: right;">10</div>';
	chart += '						<div class="flot-tick-label tickLabel" style="position: absolute; top: 90px; left: 6px; text-align: right;">15</div>';
	chart += '						<div class="flot-tick-label tickLabel" style="position: absolute; top: 45px; left: 6px; text-align: right;">20</div>';
	chart += '						<div class="flot-tick-label tickLabel" style="position: absolute; top: 1px; left: 0px; text-align: right;">25</div>';
	chart += '					</div>';
	chart += '				</div>';
	chart += '				<canvas class="flot-overlay" width="1058" height="480" style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 529px; height: 240px;"></canvas>';
	chart += '			</div>';
	chart += '		</div>';
	chart += '	</section>';
	chart += '</div>';
	
	return chart;
}

function updateSimpleChart() {
	var d1 = [];
	for (var i = 0; i <= 11; i += 1) {
		d1.push([i, parseInt((Math.floor(Math.random() * (1 + 20 - 10))) + 10)]);
	}
	var plot = $.plot($("#flot-color"), [{
					data: d1
			}], 
			{
				series: {
						lines: {
								show: true,
								lineWidth: 1,
								fill: true,
								fillColor: {
										colors: [{
												opacity: 0.0
										}, {
												opacity: 0.2
										}]
								}
						},
						points: {
								radius: 5,
								show: true
						},
						shadowSize: 2
				},
				grid: {
						color: "#fff",
						hoverable: true,
						clickable: true,
						tickColor: "#f0f0f0",
						borderWidth: 0
				},
				colors: ["#3fcf7f"],
				xaxis: {
						mode: "categories",
						tickDecimals: 0
				},
				yaxis: {
						ticks: 5,
						tickDecimals: 0
				},
				tooltip: true,
				tooltipOpts: {
					content: "%x.1 is %y.4",
					defaultTheme: false,
					shifts: {
						x: 0,
						y: 20
					}
				}
			}
	);
}

function updateRealTimeUpdateChartTest() {
	// live update
	var data = [],
	totalPoints = 300;
	
	var x = 0;
	
	function getRandomData() {
		
		if (data.length > 0)
			data = data.slice(1);

		// Do a random walk

		while (data.length < totalPoints) {

//			var prev = data.length > 0 ? data[data.length - 1] : 50,
//					y = prev + Math.random() * 10 - 5;

//			var prev = data.length > 0 ? data[data.length - 1] : 0,
//					y = prev + 1;

			var prev = data.length > 0 ? data[data.length - 1] : 0,
					y = Math.sin(x+=0.1) * x * 0.1 + 50;

			if (y < 0) {
				y = 0;
			} else if (y > 100) {
				y = 100;
			}

			data.push(y);
		}

		// Zip the generated y values with the x values

		var res = [];
		for (var i = 0; i < data.length; ++i) {
			res.push([i, data[i]]);
		}

		return res;
	}

	var updateInterval = 30;
	var plot = $.plot("#flot-live", [ getRandomData() ], {
		series: {
			lines: {
				show: true,
				lineWidth: 1,
				fill: true,
				fillColor: {
					colors: [{
						opacity: 0.2
					}, {
						opacity: 0.1
					}]
				}
			},
			shadowSize: 2
		},
		colors: ["#5191d1"],
		yaxis: {
			min: 0,
			max: 100
		},
		xaxis: {
			show: false
		},
		grid: {
			tickColor: "#f0f0f0",
			borderWidth: 0
		},
	});

	function update() {

		plot.setData([getRandomData()]);

		// Since the axes don't change, we don't need to call plot.setupGrid()

		plot.draw();
		setTimeout(update, updateInterval);
	}

	update();
}

var data2 = [];

function plot(data2) {
	var res = [];
	for (var i = 0; i < data2.length; ++i) {
		res.push([i, data2[i]]);
	}
	var plot = $.plot("#flot-live", [ res ], {
		series: {
			lines: {
				show: true,
				lineWidth: 1,
				fill: true,
				fillColor: {
					colors: [{
						opacity: 0.2
					}, {
						opacity: 0.1
					}]
				}
			},
			shadowSize: 2
		},
		colors: ["#5191d1"],
		yaxis: {
			min: -15,
			max: 35
		},
		xaxis: {
			show: false
		},
		grid: {
			tickColor: "#f0f0f0",
			borderWidth: 0
		},
	});
	plot.setData([res]);
	plot.draw();
}

function updateTemperature() {

	var totalPoints = 10;

	if (data2.length == 0) {
		$.getJSON('/monitor/temperature/' + totalPoints, function( data ) {
			console.log(data);
			$.each(data, function() {
				console.log(this.temperature);
				data2.push(this.temperature);
			});
			plot(data2);
			setTimeout(updateTemperature, 1000);
		});
	} else {
		data2 = data2.slice(1);
		$.getJSON('/monitor/temperature/1', function( data ) {
			console.log(data);
			$.each(data, function() {
				console.log(this.temperature);
				data2.push(this.temperature);
			});
			plot(data2);
			setTimeout(updateTemperature, 1000);
		});
	}
}

function populateCharts() {
	var charts = '';
	charts += '<div class="row">';
	charts += makeSimpleChart();
	charts += makeRealTimeUpdateChart();
	charts += '</div>';
	$('#charts').append(charts);
}

$(document).ready(function() {
	populateCharts();
	updateSimpleChart();
//	updateRealTimeUpdateChart();
	updateTemperature();
});
