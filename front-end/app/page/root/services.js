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