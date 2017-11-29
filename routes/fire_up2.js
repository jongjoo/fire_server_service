var express = require('express');
var router = express.Router();
var async = require('async');
var mysql = require('mysql');
var msg = require('../message.js');

var db_config = require('../config/db_config.json');
var pool = mysql.createPool(db_config);

router.post('/fire_up2', function(req, res, next){
         pool.getConnection(function(err,con){
           if (err) {
             console.log("getConnection Error" + err);
             res.sendStatus(500);
         } else {
                   console.log("호스팅완료");

                 var sqlForInsert = 'insert into fire_live (temp, mois, gas, smo, move, user) values (?,?,?,?,?,?)'
		 var sql_value = [req.body.temp, req.body.mois, req.body.gas, req.body.smo, req.body.move, req.body.user];
                 con.query(sqlForInsert, sql_value, function(err, result){
                         if(err)
                                 console.log('insert error: ', err.message);
                         else
                                 res.redirect('/');
                 });
         }
         });
});


module.exports = router;
