'use strict';

/* Controllers */

app.controller('LoginCtrl', ['$scope', 'loginService', function ($scope, loginService) {   
        $scope.loginForm = function () {
            if (!loginService.login($scope.login)) {
                $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'incorrect information'};
            }
        };
    }]);