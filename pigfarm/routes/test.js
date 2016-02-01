var express = require('express');
var router = express.Router();
var shooter = require('./sms.js');

router.get('/', function(req, res, next) {
	res.render('test', { title: '테스트 - 정진농장 통합관리 시스템' });
});

router.get('/sms', function(req, res) {
	shooter.shoot('hello! 안녕하세요!');
});

module.exports = router;
