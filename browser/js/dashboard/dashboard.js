app.config(function($stateProvider) {
    $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: 'js/dashboard/dashboard.html',
        controller: 'dashCtrl',
        resolve: {
            user: function(AuthService) {
                return AuthService.getLoggedInUser().then(function(user) {
                    return user
                })
            }
        },
        data: {
            authenticate: true
        }
    });
})

app.controller('dashCtrl', function($scope, AuthService, $state, user, $modal) {
    $scope.user = user
    $state.transitionTo('overview')
    $scope.checked = true
    $scope.animationsEnabled = true;

    $scope.checkUser = function() {
        if ($scope.checked) {
            $scope.checked = false;
            var modalInstance = $modal.open({
                animation: $scope.animationEnabled,
                backdrop: 'static',
                keyboard: false,
                templateUrl: 'js/common/directives/modal/modal.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {

                }
            })
            modalInstance.result.then(function(checked) {
                if (checked) {
                    $scope.checked = true;
                } else {
                    window.clearInterval(timer)
                    $state.go('home')

                }
            });
        }
    }
    var timer = window.setInterval($scope.checkUser, 30 * 60 * 1000)

});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

app.controller('ModalInstanceCtrl', function($scope, $modalInstance, AuthService) {
    AuthService.logout()
    $scope.checked = false
    $scope.update = function(check) {
        AuthService.login(check).then(function() {
            $scope.checked = true
            $modalInstance.close($scope.checked);
        }).catch(function() {
            $scope.error = 'Invalid login credentials.';
        });
    };

    $scope.cancel = function() {
        $modalInstance.close($scope.checked);
    }

});