function updateCharts() {
	// live update
	var data = [],
	totalPoints = 300;

	function getRandomData() {

		if (data.length > 0)
			data = data.slice(1);

		// Do a random walk

		while (data.length < totalPoints) {

			var prev = data.length > 0 ? data[data.length - 1] : 50,
					y = prev + Math.random() * 10 - 5;

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
			res.push([i, data[i]])
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

function populateCharts() {
	var charts = '';
	charts += '<div class="row">';
	
	charts += '	<div class="col-md-6">';
	charts += '		<section class="panel">';
	charts += '			<header class="panel-heading font-bold">Real-time update</header>';
	charts += '			<div class="panel-body">';
	charts += '				<div id="flot-live" style="height: 240px; padding: 0px; position: relative;"><canvas class="flot-base" width="1058" height="480" style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 529px; height: 240px;"></canvas><div class="flot-text" style="position: absolute; top: 0px; left: 0px; bottom: 0px; right: 0px; font-size: smaller; color: rgb(84, 84, 84);"><div class="flot-y-axis flot-y1-axis yAxis y1Axis" style="position: absolute; top: 0px; left: 0px; bottom: 0px; right: 0px; display: block;"><div class="flot-tick-label tickLabel" style="position: absolute; top: 225px; left: 13px; text-align: right;">0</div><div class="flot-tick-label tickLabel" style="position: absolute; top: 180px; left: 6px; text-align: right;">20</div><div class="flot-tick-label tickLabel" style="position: absolute; top: 135px; left: 6px; text-align: right;">40</div><div class="flot-tick-label tickLabel" style="position: absolute; top: 90px; left: 6px; text-align: right;">60</div><div class="flot-tick-label tickLabel" style="position: absolute; top: 45px; left: 6px; text-align: right;">80</div><div class="flot-tick-label tickLabel" style="position: absolute; top: 1px; left: 0px; text-align: right;">100</div></div></div><canvas class="flot-overlay" width="1058" height="480" style="direction: ltr; position: absolute; left: 0px; top: 0px; width: 529px; height: 240px;"></canvas></div>';
	charts += '			</div>';
	charts += '		</section>';
	charts += '	</div>';
	charts += '</div>';
	
	$('#charts').append(charts);
}

$(document).ready(function() {
	populateCharts();
	updateCharts();
});
