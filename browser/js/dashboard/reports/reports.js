app.config(function($stateProvider) {
    $stateProvider.state('reports', {
        templateUrl: 'js/dashboard/reports/reports.html',
        controller: 'reportsCtrl',
        parent: 'dashboard'

    })
})

app.controller('reportsCtrl', function($scope) {
    $scope.home = true
    $scope.user.data = ['graph1', 'graph2', 'graph3', 'graph4', 'graph5', 'graph6', 'graph7', 'graph8']
    $scope.section = "Choose a report";

    $scope.makeGraph = function(data) {
        console.log(data)
    }
})