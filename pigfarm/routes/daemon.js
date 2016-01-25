var cron = require('cron');

const schedEveryTenMin = '0 0,10,20,30,40,50 * * * *';
const schedEveryTenSec = '0,10,20,30,40,50 * * * * *';

var cronJob = cron.job(schedEveryTenSec, function() {
	// perform operation e.g. GET request http.get() etc.
	console.info('cron job completed');
});

var init = function() {
	cronJob.start();
	console.log('daemon initialized');
};

exports.init = init;
