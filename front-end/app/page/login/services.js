'use strict';

/* Services */

app.factory('loginService', ['RestFul', '$location', 'sessionService', function (RestFul, $location, sessionService) {
        return{
            login: function (login) {
                // TODO login functions
                RestFul.get({
                    jsonFile: 'login.json',
                    type: 'login',
                    username: login.username,
                    password: login.password
                }, function (data) {
                    if ((data[0] !== 'logout') && (data.length > 1)) {
                        sessionService.set('uid', data[0]);
                        sessionService.set('authkey', data[1]);
                        sessionService.set('level', data[2]);
                        $location.path('home');
                    } else {
                        $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'incorrect information'};
                    }
                }, function(err){
                    throw err;
                });
            },
            logout: function () {
                sessionService.destroy();
                $location.path('login');
            },
            islogged: function () {
                RestFul.get({
                    jsonFile: 'login.json',
                    uid: sessionStorage.uid
                }, function (auth_data) {
                    if (auth_data[0] !== 'authentified') {
                        $location.path('login');
                    }
                }, function () {
                    $location.path('login');
                });
            }
        };
    }]);

app.factory('sessionService', ['RestFul', function (RestFul) {
        return{
            set: function (key, value) {
                return sessionStorage.setItem(key, value);
            },
            destroy: function () {
                RestFul.delete({
                    jsonFile: 'login.json',
                    uid: sessionStorage.uid
                }, function () {
                    sessionStorage.removeItem('uid');
                    sessionStorage.removeItem('level');
                });
                return sessionStorage;
            }
        };
    }]);