
/**
    
    app.js
    @author: @rhbrock
    @description: Music Server using Express JS

 **/

'use strict'

// import required modules/libraries
// express module
var express = require('express');
//for file system handling
var fs = require('fs');
//set port
var port = 3003;

//initialize express app
var app = express();

// declare public directory to be used as a store for static files
app.use('/public', express.static(__dirname + '/public'));

// make the default route to serve our static file 
app.get('/', function (req, res) {

    return res.redirect('/public/home.html');

});

//starting port and log message
app.listen(port, function () {
    console.log('App is listening on port 3003');
});


//create music stream (reads) from file and pipe the output
app.get('/musicfiles', function (req, res) {

    var fileId = req.query.id;
    var file = __dirname + '/musicfiles/' + fileId;

    fs.exists(file, function (exists) {
        if (exists) {
            var rstream = fs.createReadStream(file);
            rstream.pipe(res);
        } else {
            res.send("404 message");
            res.end();
        }
    });

});

//downloads instead of streams.  For Google Chrome
app.get('/download', function (req, res) {
    var fileId = req.query.id;
    var file = __dirname + '/musicfiles/' + fileId;

    fs.exists(file, function (exists) {
        if (exists) {
            res.setHeader('Content-disposition', 'attachment; filename=' + fileId);
            res.setHeader('Content-Type', 'application/audio/mpeg3')
            var rstream = fs.createReadStream(file);
            rstream.pipe(res);
        }
        else {
            res.send("404 message");
            res.end();
        }
    });
});