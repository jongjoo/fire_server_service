const express = require('express');
const router = express.Router();
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

module.exports = router;
