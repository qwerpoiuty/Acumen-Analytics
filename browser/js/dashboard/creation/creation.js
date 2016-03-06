app.config(function($stateProvider) {
    $stateProvider.state('creation', {
        templateUrl: 'js/dashboard/creation/creation.html',
        controller: 'creationCtrl',
        parent: 'dashboard'
    })
})

app.controller('creationCtrl', function($scope, dataFactory) {

    $scope.getData = function(userID) {
        dataFactory.getData(userID).then(function(user) {
            console.log(user)
            $scope.user = user
        })
    }
    $scope.getData($scope.user._id)

    $scope.chosen = false
    $scope.type = ""

    $scope.make = function(type) {
        $scope.chosen = true
        $scope.type = type
    }
    var dummy = [{
        "day": 1,
        "instagram": 1379,
        "twitter": 670,
        "facebook": 948
    }, {
        "day": 2,
        "instagram": 1151,
        "twitter": 1233,
        "facebook": 1168
    }, {
        "day": 3,
        "instagram": 1102,
        "twitter": 1048,
        "facebook": 1037
    }, {
        "day": 4,
        "instagram": 837,
        "twitter": 1185,
        "facebook": 1081
    }, {
        "day": 5,
        "instagram": 785,
        "twitter": 962,
        "facebook": 1107
    }, {
        "day": 6,
        "instagram": 1255,
        "twitter": 390,
        "facebook": 1280
    }, {
        "day": 7,
        "instagram": 1034,
        "twitter": 328,
        "facebook": 1195
    }, {
        "day": 8,
        "instagram": 2053,
        "twitter": 1025,
        "facebook": 1115
    }, {
        "day": 9,
        "instagram": 258,
        "twitter": 1022,
        "facebook": 1086
    }, {
        "day": 10,
        "instagram": 2072,
        "twitter": 1043,
        "facebook": 1243
    }, {
        "day": 11,
        "instagram": 1321,
        "twitter": 925,
        "facebook": 1242
    }, {
        "day": 12,
        "instagram": 1126,
        "twitter": 893,
        "facebook": 1451
    }]

    $scope.create = function() {
        if ($scope.type === "Graph") {
            $scope.product.data = dummy
            dataFactory.makeGraph($scope.user, $scope.product)
        } else if ($scope.type === "Group") {
            dataFactory.makeGroup($scope.user._id, $scope.product.title)
        }
    }
    $scope.cancel = function() {
        $scope.chosen = false
    }
})