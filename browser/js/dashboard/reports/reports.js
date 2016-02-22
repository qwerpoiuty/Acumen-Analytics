app.config(function($stateProvider) {
    $stateProvider.state('reports', {
        templateUrl: 'js/dashboard/reports/reports.html',
        controller: 'reportsCtrl',
        parent: 'dashboard'

    })
})

app.controller('reportsCtrl', function($scope, d3factory, dataFactory) {
    $scope.getData = function() {

        dataFactory.getGroup($scope.user.groups).then(function(groups) {
            $scope.groups = groups
        })
    }
    // var ids = [
    //     "56c997364c43593c7e9c52c5",
    //     "56c997364c43593c7e9c52c6"
    // ]

    var graph3 = {
        title: "test3",
        type: "bar",
        data: [1, 2, 3, 4, 5, 6, 7, 8, 10]

    }

    $scope.makeGroup = function() {
        var group = {
            title: 'HelloWorld'
        }
        dataFactory.makeGroup($scope.user._id, group)
        // dataFactory.makeGraph(graph3)
    }
    $scope.selected = false
    $scope.section = "Choose a report";
    // $scope.makeGroup()
    // $scope.getData();
    $scope.makeGraph = function() {
        dataFactory.makeGraph('HelloWorld', graph3)
    }
    $scope.makeGraph()
    $scope.back = function() {
        $scope.selected = false
    }
    // $scope.makeGraph = function(data) {
    //     console.log('hello', data)
    //     $scope.selected = true
    //     $('graph').empty();
    //     d3factory.makeBarGraph('graph', data, 400, 400)
    // }
})