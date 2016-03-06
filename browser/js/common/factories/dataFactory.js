app.factory('dataFactory', function($http) {
    var data = {}
    data.getData = function(userID) {
        console.log(userID)
        return $http.get('/api/users/getData/' + userID).then(function(response) {
            return response.data
        })
    }

    data.makeGroup = function(userID, groupTitle) {
        var group = {
            title: groupTitle
        }
        return $http.post('/api/groups/' + userID, group).then(function(response) {
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

    data.removeGroup = function(email, groupID) {
        var query = {}
        query.ids = groupID
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

    data.addGraph = function(graph) {
        var query = {}
        query.graph = graph
        return $http.put('/api/groups/addGraph/' + graph.group, {
            params: query
        })
    }

    data.makeGraph = function(user, graph) {
        var isAdmin = false
        var groupID = ""
        for (var i = 0; i < user.groups.length; i++) {
            if (user.groups[i].admins.indexOf(user._id) !== -1 && user.groups[i]._id === graph.group) {
                isAdmin = true
                groupID = user.groups[i]._id
            }
        }
        if (isAdmin) {
            return $http.post('api/graphs/' + groupID, graph)
                .then(function(response) {
                    return data.addGraph(response.data)
                        .then(function(res) {
                            return res.data
                        })
                })
        } else {
            alert('You do not have that level of power')
        }
    }

    data.addData = function(graph, data) {
        for (var i = 0; i < user.groups.length; i++) {
            if (user.groups[i].admins.indexOf(user._id) !== -1 && user.groups[i]._id === graph.group) {
                isAdmin = true
                groupID = user.groups[i]._id
            }
        }
        if (isAdmin) {
            return $http.put('api/graphs/' + graph._id, graph)
                .then(function(response) {
                    return response.data;
                })
        } else {
            alert('You do not have that level of power')
        }
    }

    return data
})