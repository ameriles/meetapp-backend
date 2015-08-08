// users.js
// REST API for Users
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/User.js');

// list
router.get('/', function(req, res, next) {
    User.find(function(err, users) {
        if (err) {
            console.log('Error');
            return next(err);
        }

        res.json(users);
    });
});

// get by id
router.get('/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if (err) {
            console.log('Error');
            return next(err);
        }

        res.json(user);
    });
});

// create
router.post('/', function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err) {
        if (err) return next(err);

        res.json(user);
    });
});

// update
router.put('/:id', function(req, res, next) {
    req.body.updatedAt = new Date(); // set updated at datetime

    User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
        if (err) return next(err);

        res.json(user);
    });
});

// delete
router.delete('/:id', function(req, res, next) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if (err) return next(err);

        res.json(user);
    });
});

// get user by facebookId
router.get('/facebook/:id', function(req, res, next) {
    User.find({
        facebookId: req.params.id
    }, function(err, users) {
        if (err) return next(err);

        res.json(users);
    });
});

router.get('/googleplus/:id', function(req, res, next) {
    User.find({
        googlePlusId: req.params.id
    }, function(err, users) {
        if (err) return next(err);

        res.json(users);
    });
});

module.exports = router;