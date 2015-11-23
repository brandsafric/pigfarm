var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('task', { title: 'Express' });
});

module.exports = router;
