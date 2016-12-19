var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var server = require('http').createServer(app);
var mongoose = require('mongoose')
var io = require('socket.io')(server)

//User model for mongoose
var User = mongoose.model('user', {
    username: String,
    password: String
})
var Message = mongoose.model('message', {
    message: String
})

//logged in users
var varnumUsers = 0;

//io
io.on('connection', function (socket) {
    //When a request to the api is being done, console.log GetMessages
    console.log('user connected')

    //start API
    app.get('/api/user', GetUsers)
    function GetUsers(req, res) {
        User.find({}).exec(function (err, result) {
            console.log(result)
            res.send(result)
        })
    }
    app.get('/api/message', GetMessages)
    function GetMessages(req, res) {
        Message.find({}).exec(function (err, result) {
            console.log(result)
            res.send(result)
        })
    }

    socket.on('register user', function (username, password) {
        console.log('regUser: ' + username, 'regPassword: ' + password)
        //Save user in MongoDB
        var user = new User({
            username: username,
            password: password
        })
        user.save()

    });

    socket.on('login attempt', function (username, password) {
        console.log('loginUser: ' + username, 'loginPassword: ' + password)
        User.findOne({ username: username, password: password }, function (err, user) {
            if (user) {
                console.log(user.username + ' logged in')
                //send info that the user has logged in
                socket.username = username;
                //io.sockets.emit('user logged in', socket.username)
                socket.emit('add to chatroom', socket.username)
                socket.broadcast.emit('user logged in', socket.username)
            }
            else {
                console.log('wrong credentials')
                //send info wrong credentials
                socket.emit('wrong credentials')
            }
        })
    })

    socket.on('send message', function (message) {
        console.log('message: ' + message)
        //Save user in MongoDB
        var message = new Message({
            message: message,
        })
        message.save()
        //socket.emit('emit message', message)
        io.sockets.emit('emit message', message)
    })
})

//serve files
app.use(express.static(__dirname + '/../client'));

//start server
server.listen(port, function () {
    console.log('Server listening on port %d', port)
})

//conenct to Mongoose
mongoose.connect('mongodb://localhost:27017/chat', function (err, db) {
    if (!err) {
        console.log('connected to mongo')
    }
    else (console.log(err))
})