var cron = require('cron');
var shooter = require('./sms.js');

const schedEveryMin = '0 * * * * *';
const schedEveryHalfMin = '*/30 * * * * *';
const schedEveryFiveMin = '0 */5 * * * *';
const schedEveryTenMin = '0 0,10,20,30,40,50 * * * *';
const schedEveryTenSec = '0,10,20,30,40,50 * * * * *';

const sec = 1000;
const minute = sec * 60;
const halfHour = minute * 30;
const hour = minute * 60;

const pingWaitTimeout = minute;
const minNotiInterval = halfHour;

var monk = require('monk');
var db = monk('localhost:27017/pigfarm');

var cronJob = cron.job(schedEveryHalfMin, function() {

	var collection = db.get('agent');

	collection.find( {}, { sort : { _id : -1 } }, function(e, docs) {
		for (var i in docs) {
			const now = new Date();
			const agentNum = docs[i].num;
			const lastPing = docs[i].lastPing;
			const lastNoti = docs[i].lastNoti;

			console.log(now);
//			console.log(lastPing);
//			console.log(lastNoti);

			if (now - lastPing < pingWaitTimeout) // It's healthy
				continue;

			if (now - lastNoti < minNotiInterval) {
				console.log('agent(' + agentNum + ')\'s been down for ' + (now - lastPing) / ( 1000 * 60 ) + ' minutes, but managers have already been notified ' + (now - lastNoti) / ( 1000 * 60 ) + ' minutes ago, so we don\'t want to bug them too much!');
				continue;
			}

			shooter.shoot('agent(' + agentNum + ') : ' + (now - lastPing) / ( 1000 * 60 ) + ' minutes elapsed since last ping!!!');

			var collection = db.get('agent');
			var agent = { num : agentNum, lastNoti : new Date() };
//			console.log(agent);
			collection.update( { num : agentNum }, { $set: agent }, { upsert : true }, function(err, result) {
//				console.log('agent(' + agentNum + ') status update ' + (result ? 'success' : 'fail!'));
			})
		}
	});
});

var init = function() {
	cronJob.start();
	console.log('daemon initialized');
};

exports.init = init;
