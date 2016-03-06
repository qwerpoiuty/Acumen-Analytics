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
            $scope.user = user
        })
    }
    $scope.getData($scope.user._id);

    $scope.selected = false
    $scope.section = "Choose a report";
    $scope.back = function() {
        $('#graph').empty()
        $scope.selected = false
        $scope.graph = null
        $scope.group = null
    }


    $scope.show = function(str) {
        $scope.title = str
        for (var i = 0; i < $scope.user.groups.length; i++) {
            console.log('logged')
            if ($scope.user.groups[i].title === str) {
                $scope.group = $scope.user.groups[i]
            }
        }
        $scope.selected = true
        $scope.mostRecent = $scope.group.data[$scope.group.data.length - 1]
        $scope.graph = $scope.mostRecent
        $scope.makeGraph($scope.graph)
    }


    $scope.changeGraph = function(graph) {
        console.log(graph)
    }
    $scope.makeGraph = function(graph) {
        $scope.data = JSON.parse(graph.data)
        $scope.header = Object.keys($scope.data[0])
        console.log(graph.data)
        $scope.key = $scope.header[0]
        $('#graph').empty();
        d3factory.makeGraph(graph.type, $scope.data, 400, 400)
    }


    // $scope.makeGraph(JSONData)

})