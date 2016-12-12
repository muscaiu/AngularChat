var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var server = require('http').createServer(app);
app.use(express.static(__dirname + '/../client'));

server.listen(port, function(){
    console.log('Server listening on port %d', port)
    console.log(__dirname + '/../client')
})