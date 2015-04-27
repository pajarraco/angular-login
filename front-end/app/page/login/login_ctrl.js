'use strict';

/* Controllers */

app.controller('LoginCtrl', ['$scope', 'loginService', function ($scope, loginService) {
        $scope.loginForm = function () {
            var promise = loginService.login($scope.login);
            promise.then(function (logged) {
                if (!logged) {
                    $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'incorrect information'};
                }
            });
        };
    }]);