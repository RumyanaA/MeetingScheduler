var express = require('express');
var cors = require('cors');
var app=express();
var routes = require('./routes/routes');
app.use(cors());
app.use(express.json());
app.use('/', routes);
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })
