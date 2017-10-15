const express = require('express');
const router = express.Router();
var async = require('async');
var mysql = require('mysql');
var msg = require('../message.js');
var bodyParser = require('body-parser');
var db_config = require('../config/db_config.json');

var pool = mysql.createPool(db_config);

router.post('/', function(req, res, next) {
	console.log(req.body);
    	pool.getConnection(function(err, connection) {

      if (err) {
          console.log("getConnection Error" + err);
          res.status(500).send(err);
      } else {
	var sql_search = 'select * from fire';//where user_id = ? and temp = ? and mois = ? and gas = ? and smo = ? and move = ?
        var sql_insert = "insert into test (test) values(?)";
        var sql_update = "UPDATE fire_live SET temp=?, mois=?, gas=?, smo=?, move=?, user=?";
        var sql_temp = req.body.substring(0,3);
        var sql_mois = req.body.substring(3,6);
        var sql_gas = req.body.substring(6,9);
        var sql_smo = req.body.substring(9,12);
        var sql_move = req.body.substring(12,15);
        var test_name = req.body.substring(15,18);
        var sql_value = [sql_temp, sql_mois, sql_gas, sql_smo, sql_move, "test"];
        async.series([
            function(callback) {
                connection.query(sql_update, sql_value, function(err, rows) {
                    if (err) {
                        callback(msg(1, err));
                        console.log("Connection Error" + err);
                    } else {
                        callback(null, msg(0, {}));
                    }

                });
            }
        ], function(err, result) {
            if (err)
                if (err.err === 2) res.status(200).send(err);
                else res.status(500).send(err);
            else
                res.status(200).send(msg(0, {}));

            connection.release();

        });

    }
});


});



module.exports = router;

