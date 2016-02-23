app.factory('dataFactory', function($http) {
    var data = {}
    data.getData = function(userID) {
        console.log(userID)
        return $http.get('/api/users/getData/' + userID).then(function(response) {
            return response.data
        })
    }

    data.makeGroup = function(userID, groupTitle) {

        return $http.post('/api/groups/' + userID, groupTitle).then(function(response) {
            return data.addGroup(userID, response.data._id).then(function(res) {
                return res.data
            })
        })
    }

    data.addGroup = function(email, group) {
        var query = {}
        query.ids = group
        return $http.put('/api/users/addGroup/' + email, {
            params: query
        })
    }

    data.removeGroup = function(email, groupTitle) {
        var query = {}
        query.ids = groupTitle
        return http.put('/api/users/removeGroup/' + email, {
            params: query
        }).then(function(response) {
            return response.data
        })
    }

    data.getGraph = function(title) {
        return $http.get('api/graphs/title/' + title).then(function(response) {
            return response.data
        })
    }

    data.addGraph = function(groupTitle, graph) {
        var query = {}
        query.graph = graph
        return $http.put('/api/groups/addGraph/' + groupTitle, {
            params: query
        })
    }

    data.makeGraph = function(groupTitle, graph) {
        var isAdmin = false
        for (var i = 0; i < user.groups; i++) {
            if (user.groups[i].admins.indexOf(user._id) !== -1) isadmin = true
        }
        if (isAdmin) {
            return $http.post('api/graphs/' + groupTitle, graph)
                .then(function(response) {
                    return data.addGraph(groupTitle, response.data._id)
                        .then(function(res) {
                            return res.data
                        })
                })
        } else {
            alert('You do not have that level of power')
        }
    }

    return data
})