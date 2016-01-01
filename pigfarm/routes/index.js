var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/monitor', function(req, res, next) {
	res.render('monitor', { title: '돈사 모니터 - 정진농장 통합관리 시스템' });
});

module.exports = router;
