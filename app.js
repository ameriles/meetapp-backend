var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var app = express();

var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/meetapp-db', function(err) {
    if (err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var users = require('./routes/users');
app.use('/users', users);

var server = app.listen(port, function() {
    console.log('MeetApp ready, running, and listening on port: ' + port);
});