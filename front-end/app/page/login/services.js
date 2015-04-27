'use strict';

/* Services */

app.factory('loginService', ['RestFul', '$location', 'sessionService',
    function (RestFul, $location, sessionService) {
        return{
            login: function (login) {
                return $q(function (logged) {
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
                            sessionService.set('username', login.username);
                            $location.path('home');
                            logged(true);
                        } else {
                            logged(false);
                        }
                    }, function () {
                        logged(false);
                    });
                });
            },
            logout: function () {
                sessionService.destroy();
                $location.path('login');
            },
            islogged: function () {
                if (angular.isDefined(sessionStorage.uid)) {
                    RestFul.post({
                        jsonFile: 'login.json',
                        uid: sessionStorage.uid
                    }, function (auth_data) {
                        if (auth_data[0] !== 'authentified') {
                            $location.path('login');
                        }
                    }, function () {
                        $location.path('login');
                    });
                } else {
                    $location.path('login');
                }
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
                    uid: sessionStorage.username
                }, function () {
                    sessionStorage.removeItem('username');
                    sessionStorage.removeItem('uid');
                    sessionStorage.removeItem('authkey');
                    sessionStorage.removeItem('level');
                });
            }
        };
    }]);