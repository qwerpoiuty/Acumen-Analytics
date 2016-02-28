app.config(function($stateProvider) {
    $stateProvider.state('reports', {
        templateUrl: 'js/dashboard/reports/reports.html',
        controller: 'reportsCtrl',
        parent: 'dashboard'

    })
})

app.controller('reportsCtrl', function($scope, d3factory, dataFactory) {
    $scope.getData = function(userID) {
        dataFactory.getData(userID).then(function(user) {
            console.log(user)
            $scope.user = user
        })
    }
    $scope.getData($scope.user._id);

    $scope.selected = false
    $scope.section = "Choose a report";
    $scope.back = function() {
        $('graph').empty()
        $scope.selected = false

    }
    $scope.bar = [{
        name: 3,
        value: 12000
    }, {
        name: 1,
        value: 2000
    }, {
        name: 2,
        value: 17000
    }, {
        name: 4,
        value: 15000
    }, {
        name: 5,
        value: 16000
    }, {
        name: 6,
        value: 16000
    }, {
        name: 7,
        value: 36000
    }, {
        name: 8,
        value: 26000
    }, {
        name: 9,
        value: 16000
    }, {
        name: 10,
        value: 16000
    }, {
        name: 11,
        value: 56000
    }]
    $scope.dataset = [{
        label: 'Abulia',
        count: 10
    }, {
        label: 'Betelgeuse',
        count: 20
    }, {
        label: 'Cantaloupe',
        count: 30
    }, {
        label: 'Dijkstra',
        count: 40
    }];

    var data2 = [{
        "sale": "152",
        "year": "2000"
    }, {
        "sale": "189",
        "year": "2002"
    }, {
        "sale": "179",
        "year": "2004"
    }, {
        "sale": "199",
        "year": "2006"
    }, {
        "sale": "134",
        "year": "2008"
    }, {
        "sale": "176",
        "year": "2010"
    }];
    $scope.data = [{
        "year": "2000",
        "sale": "202"
    }, {
        "year": "2001",
        "sale": "215"
    }, {
        "year": "2002",
        "sale": "179"
    }, {
        "year": "2003",
        "sale": "199"
    }, {
        "year": "2004",
        "sale": "134"
    }, {
        "year": "2010",
        "sale": "176"
    }];
    $scope.makeGraph = function(type, data) {
        // $scope.graph = graph
        console.log(data)
        $scope.header = Object.keys(data[0])
        $scope.selected = true
        $('graph').empty();
        d3factory.makeGraph(type, JSON.stringify(data), 400, 400)
    }


    // $scope.makeGraph(JSONData)

})