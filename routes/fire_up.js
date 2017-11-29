const express = require('express');
const router = express.Router();
var async = require('async');
var mysql = require('mysql');
var msg = require('../message.js');
var bodyParser = require('body-parser');
var db_config = require('../config/db_config.json');
var gcm = require('../gcm.js');
//var FCM = require('fcm-node');
var pool = mysql.createPool(db_config);

var gcm = require('node-gcm');
var message = new gcm.Message();


var message = new gcm.Message({
    collapseKey: 'Gcm Test',
    delayWhileIdle: true,
    timeToLive: 3,
    data: {
        data: 'Gcm Receive Success'
    }
});

var serverKey = 'AAAAPhqrQcY:APA91bHryAO70gPa54ERSH6Arh1jrrevpe0LnC2LQ6x2Z6TSu-7o0hXJ3eOAex4uB7XTVg9aNpcLWxlhpbQzJbcmf-OXhLyKc7367KH6yI-zCL86ZLNkFEZNbGoLZiUzbF7cvfXQLSUN';
var sender = new gcm.Sender(serverKey);
var registrationIds = [];

var client_token = 'eUe1E10sGUw:APA91bGDZmk5bNJ5AXhrKWChrwsIbSp8xg9nomKw5K-hZLpPOAyzhw791dPY0-KAmzVuCtVMEzifLi6MJpEC9qSgd0jq57uId36aHXJJkgkZcmF2wkG_6jtyCJaBW-F2h3Vxn9UKgKjM';

var token = client_token;

registrationIds.push(token);

//sender.send(message, registrationIds, 4, function (err, result) {
//    console.log(result);
//});

router.post('/', function(req, res, next) {
	console.log(req.body);
    	pool.getConnection(function(err, connection) {

      if (err) {
          console.log("getConnection Error" + err);
          res.status(500).send(err);
      } else {
	var sql_search = 'select * from fire';//where user_id = ? and temp = ? and mois = ? and gas = ? and smo = ? and move = ?
        var sql_insert = "insert into test (test) values(?)";
        var sql_update = "UPDATE fire_live SET temp=?, mois=?, gas=?, move=?, threat=?, user=?";
        var sql_temp = req.body.substring(0,3);
        var sql_mois = req.body.substring(3,6);
        var sql_gas = req.body.substring(6,9);
        var sql_move = req.body.substring(9,10);
        var test_name = req.body.substring(15,18);
        //var sql_value = [sql_temp, sql_mois, sql_gas, sql_move, sql_threat, "test"];

	var Threat = 0;
	
	if(sql_temp>=50&&sql_gas>=290&&sql_move==0)
		Threat = 2;
	else if(sql_temp>=40&&sql_gas>=280)
		Threat = 1;
	else 
		Threat = 0;

	var sql_value = [sql_temp, sql_mois, sql_gas, sql_move, Threat, "test"];

	if(sql_temp>=100){
		sender.send(message, registrationIds, 4, function (err, result) {
		console.log(result);
		});
	}	

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

