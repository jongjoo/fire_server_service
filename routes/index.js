var express = require('express');
var router = express.Router();
var async = require('async');
var mysql = require('mysql');
var msg = require('../message.js');

var db_config = require('../config/db_config.json');

var pool = mysql.createPool(db_config);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/te', function(res, res){


});

router.get('/insert', function (request, response) {
  fs.readFile('/views/insert.html', 'utf8', function (error, data) {
    response.send(data);
  });
});

router.post('/insert', function (request, response) {
  var body = request.body;
  client.query('INSERT INTO products (name, modelnumber, series) VALUES (?, ?, ?)', [
      body.name, body.modelnumber, body.series
  ], function () {
    response.redirect('/');
  });
});

module.exports = router;
