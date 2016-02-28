app.config(function($stateProvider) {
    $stateProvider.state('overview', {
        templateUrl: 'js/dashboard/overview/overview.html',
        controller: 'overviewCtrl',
        parent: 'dashboard'
    })
})
app.controller('overviewCtrl', function($scope, AuthService, $stateParams, dataFactory) {
    $scope.getData = function(userID) {
        dataFactory.getData(userID).then(function(user) {
            console.log(user)
            $scope.user = user
        })
    }
    $scope.getData($scope.user._id);
})