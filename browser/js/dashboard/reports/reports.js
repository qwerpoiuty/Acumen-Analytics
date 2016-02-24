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
        $scope.selected = false
    }
    $scope.makeGraph = function(data) {
        $scope.selected = true
        $('graph').empty();
        d3factory.makeBarGraph('graph', data, 400, 400)
    }


    // $scope.makeGraph(JSONData)

})