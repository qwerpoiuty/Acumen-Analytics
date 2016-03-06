var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Graphs = mongoose.model('Graphs');
var UserModel = mongoose.model('User');

var ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

router.get('/', ensureAuthenticated, function(req, res, next) {
    var modelParams = {}
    if (req.query.title) modelParams.title = req.query.title;
    if (req.query.type) modelParams.type = req.query.type;
    if (req.query.refID) modelParams._id = req.query._id;

    Graphs.find(modelParams).then(function(graph) {
        res.json(graph);
    })

}, function(err) {
    console.log('failed to find data', err);
})

router.get('/title/:title', ensureAuthenticated, function(req, res, next) {
    console.log('hello', req.params.title)
    Graphs.findOne({
        title: req.params.title
    }).exec().then(function(graph) {
        res.json(graph)
    }, function(err) {
        console.log(err);
    })

})
router.put('/:id', ensureAuthenticated, function(req, res, next) {
    Graphs.findOneById(req.params.id).exec().then(function(graph) {
        graph.data.push(req.body)
        graph.save(function(err) {
            if (err) return next(err);
            res.status.send(graph)
        })
    })
})
router.post('/:id', ensureAuthenticated, function(req, res, next) {
    var graph = new Graphs(req.body);
    graph.group = req.params.id
    graph.save(function(err) {
        if (err) return next(err);
        res.status(200).send(graph);
    })
})