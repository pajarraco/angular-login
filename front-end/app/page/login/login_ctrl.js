'use strict';

/* Controllers */

app.controller('LoginCtrl', ['$scope', 'loginService', function ($scope, loginService) {

        $scope.loginForm = function () {
            loginService.login($scope.login);
        };

    }]);