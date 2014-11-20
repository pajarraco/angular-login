'use strict';

/* Controllers */

app.controller('NavCtrl', ['$scope', '$location', 'loginService', function ($scope, $location, loginService) {

        $scope.url = $location.path();
        
        console.log('$scope.url', $scope.url);
        
        $scope.logout = function () {
            loginService.logout();
        };

    }]);
