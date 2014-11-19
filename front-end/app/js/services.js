'use strict';

/* Services */

app.value('version', '0.2');

app.factory('RestFul', ['$resource', function ($resource) {
        return $resource('api/:jsonFile',
                {jsonFile: '@jsonFile'}, {
            get: {
                method: 'GET',
                headers: {'Auth-Key': sessionStorage.authkey},
                params: {jsonFile: '@jsonFile'},
                isArray: true,
                timeout: 4000
            },
            post: {
                method: 'POST',
                headers: {'Auth-Key': sessionStorage.authkey},
                params: {jsonFile: '@jsonFile'},
                isArray: true,
                timeout: 4000
            },
            put: {
                method: 'PUT',
                headers: {'Auth-Key': sessionStorage.authkey},
                params: {jsonFile: '@jsonFile'},
                isArray: true,
                timeout: 4000
            },
            delete: {
                method: 'DELETE',
                headers: {'Auth-Key': sessionStorage.authkey},
                params: {jsonFile: '@jsonFile'},
                isArray: true,
                timeout: 4000
            },
            test: {
                method: 'POST',
                headers: {'Auth-Key': sessionStorage.authkey},
                params: {jsonFile: '@jsonFile'},
                isArray: false,
                timeout: 4000
            }
        });
    }]);

app.factory('loginService', ['RestFul', '$location', 'sessionService', function (RestFul, $location, sessionService) {
        return{
            logout: function () {
                sessionService.destroy('uid');
                $location.path('login');
            },
            islogged: function () {
                var auth_data = RestFul.post({
                    jsonFile: 'login.json',
                    uid: sessionStorage.uid
                }, function () {
                    if (auth_data[0] != 'authentified') {
                        $location.path('login');
                    }
                });
            }
        };
    }]);

app.factory('sessionService', ['RestFul', function (RestFul) {
        return{
            set: function (key, value) {
                return sessionStorage.setItem(key, value);
            },
            destroy: function (key) {
                var out_data = RestFul.delete({
                    jsonFile: 'login.json',
                    uid: sessionStorage.uid
                }, function () {
                    console.log('out_data:', out_data);
                    sessionStorage.removeItem('uid');
                    sessionStorage.removeItem('authkey');
                    sessionStorage.removeItem('level');
                    sessionStorage.removeItem('company_id');
                });
                return sessionStorage;
            }
        };
    }]);