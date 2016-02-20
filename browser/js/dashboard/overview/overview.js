app.config(function($stateProvider) {
    $stateProvider.state('overview', {
        templateUrl: 'js/dashboard/overview/overview.html',
        controller: 'overviewCtrl',
        parent: 'dashboard'
    })
})
app.controller('overviewCtrl', function($scope, AuthService, $stateParams) {

})