// https://github.com/BlueHouseLab/sms-openapi/blob/master/node.js/sendsms.js
// http://www.bluehouselab.com/sms/edit/pigfarm
	
var c = require('./conf');
var https = require("https");
var credential = 'Basic '+new Buffer(c.APPID+':'+c.APIKEY).toString('base64');

var shoot = function(content) {

	console.log('[SMS] ' + content);
	return;

	var data = {
		"sender"    : c.SENDER,
//		"receivers" : c.RECEIVERS,
//		"content"   : c.CONTENT
		"receivers" : ['01048996329'],
		"content"   : content
	}
	var body = JSON.stringify(data);

	var options = {
		host: 'api.bluehouselab.com',
		port: 443,
		path: '/smscenter/v1.0/sendsms',
		headers: {
			'Authorization': credential,
			'Content-Type': 'application/json; charset=utf-8',
			'Content-Length': Buffer.byteLength(body)
		},
		method: 'POST'
	};

	var req = https.request(options, function(res) {
		console.log(res.statusCode);
		var body = "";
		res.on('data', function(d) {
			body += d;
		});
		res.on('end', function(d) {
			if(res.statusCode==200)
			console.log(JSON.parse(body));
		else
			console.log(body);
		});
	});

	req.write(body);
	req.end();
	req.on('error', function(e) {
		console.error(e);
	});
}

exports.shoot = shoot;
