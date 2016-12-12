var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var server = require('http').createServer(app);
app.use(express.static(__dirname + '/../client'));
//add io
var io = require('socket.io')(server)

//Logged in users
var varnumUsers = 0;

io.on('connection', function(socket){
    console.log('user connected')

    socket.on('loginData', function (username, password) {
        console.log(username, password)
    });

    // socket.on('userLogin', function(){
    //     //notify that user is logged in

    //     //change to chatroom

    // })
})

server.listen(port, function(){
    console.log('Server listening on port %d', port)
})