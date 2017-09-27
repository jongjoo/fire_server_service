
const express = require('express');
const router = express.Router();
var async = require('async');
var mysql = require('mysql');
var msg = require('../message.js');

var db_config = require('../config/db_config.json');

var pool = mysql.createPool(db_config);

router.route('/')
    .post(test)


function test(req, res) {
    pool.getConnection(function(err, connection) {
      if (err) {
          console.log("getConnection Error" + err);
          res.status(500).send(err);
      } else {
        var sql_search = 'select * from test';//where user_id = ? and temp = ? and mois = ? and gas = ? and smo = ? and move = ?
        var sql_insert = 'insert into tset (test) values (?)';
        var sql_value = [req.body.test];

        async.series([
            function(callback) {
                connection.query(sql_search, sql_value, function(err, rows) {
                    if (err) {
                        callback(msg(1, error));
                        console.log(error);
                    } else {
                        if (rows.length === 0) callback(null, 'there is no data with fire');
                        else callback(msg(2, 'duplicate fire'));
                    }
                });
            },
            function(callback) {
                connection.query(sql_insert, sql_value, function(err, rows) {
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


}



module.exports = router;
