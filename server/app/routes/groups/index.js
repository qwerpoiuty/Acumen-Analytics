var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Groups = mongoose.model('Groups');
var User = mongoose.model('User');

var ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

router.get('/all', ensureAuthenticated, function(req, res) {
    console.log('hello', req.query.ids)
    Groups.find({
        '_id': {
            $in: req.query.ids
        }
    }).populate('data').exec().then(function(groups) {
        console.log(groups)
        res.json(groups)
    })
})

router.post('/:id', ensureAuthenticated, function(req, res) {

    var group = new Groups(req.body)
    group.admins.push(req.params.id)
    group.save(function(err) {
        if (err) return next(err);
        res.status(200).send(group);
    })
})
router.put('/addGraph/:title', ensureAuthenticated, function(req, res) {
    console.log('hello', req.params.title)
    Groups.findOne(req.params.title).then(function(group) {
        group.data.push(req.body.params.graph)
        group.save(function(err) {
            if (err) return next(err);
            res.status(200).send(group);
        })
    })
})

router.put('/removeGroup/:id', ensureAuthenticated, function(req, res) {
    Groups.findOne(req.params.id).then(function(group) {
        for (var i = 0; i < group.data.length; i++) {
            if (group.data[i] === req.body.params.ids) group.data.splice(i + 1, 1)
        }
        group.save(function(err) {
            if (err) return next(err);
            res.status(200).send(group);
        })
    })
})
// router.put('/addmember/:userID', function(req, res, next) {
//     Group.findById(req.params.parentId, function(err, group) {
//         if (err) return next(err);
//         if (group.admins.indexOf(req.params.userID) !== -1) {
//             User.findById(req.body).then(function(err, user) {
//                 user.groups.push(group.title)
//                 user.save(function(user))
//             })
//         }
//     })
// })