var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'); 

var app = express(); 

// For socket.io 
var http = require('http').Server(app); 
var io = require('socket.io')(http); 
var port = process.env.PORT || 3000; 

mongoose.connect('mongodb://localhost/meetapp-db', function(err) {
    if (err) {
        console.log('MongoDB connection error', err);
    } else {
        console.log('MongoDB connection successful');
    }
});

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
    extended: true
}));

var users = require('./routes/users'); 
app.use('/users', users);

app.get('/', function(req, res) {
    res.sendfile('./static_html/index.html');
});

var clients = [];
// Event fired every time a new client connects:
io.on('connection', function (socket) {
    console.info('New client connected (id=' + socket.id + ').');
    clients.push(socket);

    socket.on('callout', function(msg) {
        console.info(msg.to + ' is calling...');
        console.info('Message: ' + msg.m);
        
        //var randomClient = Math.floor(Math.random() * clients.length);
        //clients[randomClient].emit('callin', 'Hi, mother "faker"!');
        io.to(msg.to).emit('callin', msg.m);
    });

    // When socket disconnects, remove it from the list:
    socket.on('disconnect', function () {
        var index = clients.indexOf(socket);
        if (index != -1) {
            clients.splice(index, 1);
            console.info('Client gone (id=' + socket.id + ').');
        }
    });
});

http.listen(port, function() {
    console.log('MeetApp ready, running, and listening on port: ' + port);
});
