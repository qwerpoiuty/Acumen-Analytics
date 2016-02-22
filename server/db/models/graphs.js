var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
        type: String
    },
    type: {
        type: String
    },
    group: {
        type: String
    },
    data: {
        type: String,
        get: function(data) {
            try {
                return JSON.parse(data);
            } catch (data) {
                return data;
            }
        },
        set: function(data) {
            return JSON.stringify(data);
        }
    }
});

mongoose.model('Graphs', schema);