'use strict';

/* Controllers */

app.controller('LoginCtrl', ['$scope', '$location', 'RestFul', 'sessionService', function($scope, $location, RestFul, sessionService) {

        $scope.loginForm = function() {
            var data = RestFul.get({
                jsonFile: 'login.json.php',
                type: 'login',
                username: $scope.login.username,
                password: $scope.login.password
            }, function() {
                if ((data[0] != 'logout') && (data.length > 1)) {
                    sessionService.set('uid', data[0]);
                    sessionService.set('authkey', data[1]);
                    sessionService.set('level', data[2]);
                    sessionService.set('company_id', data[3]);
                    $location.path('home');
                } else {
                    $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'incorrect information'};
                }
            });
        };

    }]);