var express = require('express');
var router = express.Router();
var async = require('async');
var mysql = require('mysql');
var msg = require('../message.js');

var db_config = require('../config/db_config.json');

var pool = mysql.createPool(db_config);


pool.getConnection(function(err,con){

	con.query('select * from fire', function(err,result){
	});
});
/* GET home page. */
router.get('/', function(req, res, next) {
	pool.getConnection(function(err,con){
        	con.query('select * from test', function(err,result){
	
  			res.render('index', { 
				data: result,
				title: 'Express' });
			con.release();
	      	});
	});
  //res.render('index', { title: 'Express' });

});
/*
router.post('/write', function(req, res, next){
	pool.getConnection(function(err,con){
	  if (err) {
            console.log("getConnection Error" + err);
            res.sendStatus(500);
        } else {
		  console.log("호스팅완료");

		var sqlForInsert = "insert into test (test) values(?)";
		con.query(sqlForInsert, req.body.test, function(err, result){
			if(err)
				console.log('insert error: ', err.message);
			else
				res.redirect('/');
		});
	}
	});
});

*/
module.exports = router;
