'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')
var schema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Groups'
    }]

});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function() {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function(plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};
schema.plugin(deepPopulate, {
    populate: {
        "groups.data": {}
    }
})
schema.pre('save', function(next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function(candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);