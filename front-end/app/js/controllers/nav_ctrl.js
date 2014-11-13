'use strict';

/* Controllers */

app.controller('NavCtrl', ['$scope', '$location', '$rootScope', 'loginService', function ($scope, $location, $rootScope, loginService) {

        $scope.userlevel = sessionStorage.level;
        $scope.$location = $location;

        $scope.logout = function () {
            loginService.logout();
        };

        $scope.goStage = function (stage) {
            if ($rootScope.save) {
                $location.path(stage);
            }
        };

    }]);
