/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Groups = Promise.promisifyAll(mongoose.model('Groups'));
var Graphs = Promise.promisifyAll(mongoose.model('Graphs'));


var getCurrentUserData = function() {
    return q.ninvoke(User, 'find', {});
}
var seedUsers = function() {

    var users = [{
        email: 'stanle@123.com',
        password: 'password',
        groups: []
    }, {
        email: 'obama@gmail.com',
        password: 'potus',
        groups: []
    }];

    return User.createAsync(users);

};
// var seedGroups = function() {
//     var user = User.findOne({
//         email: "testing@fsa.com"
//     })
//     var groups = {
//         title: "testing1",
//         admins: [user._id],
//         data: []
//     }
//     return Groups.createAsync(groups)



// }

// var seedGraphs = function() {
//     var graphs = [{
//         title: "test1",
//         type: "bar",
//         group: ["testing1"],
//         data: [1, 2, 3, 4, 5, 6, 7, 8, 10]

//     }, {
//         title: "test2",
//         type: "bar",
//         group: ["testing2"],
//         data: [4, 2, 3, 1, 5, 6, 7, 8, 140]

//     }]

//     return Graphs.createAsync(graphs);
// };

connectToDb.then(function() {
    User.findAsync({}).then(function(users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
        // }).then(function() {
        //     return seedGroups();
        // }).then(function() {
        //     return seedGraphs();
    }).then(function() {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function(err) {
        console.error(err);
        process.kill(1);
    });
});