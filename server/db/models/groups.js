var mongoose = require('mongoose');
var crypto = require('crypto');

var schema = new mongoose.Schema({
    title: {
        type: String
    },
    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    data: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Graphs'
    }]

});

schema.method('isAdmin', function(user) {
    return this.admins.indexOf(user) !== 0;
});

mongoose.model('Groups', schema);