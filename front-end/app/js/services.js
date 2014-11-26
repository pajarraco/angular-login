'use strict';

/* Services */

app.factory('RestFul', ['$resource', 'apiAuthKey', function ($resource, apiAuthKey) {
        return $resource('http://localhost/cw-cms-api/api/:jsonFile' + '.php',
                {jsonFile: '@jsonFile'}, {
            get: {
                method: 'GET',
                headers: {'Auth-Key': apiAuthKey},
                params: {jsonFile: '@jsonFile'},
                isArray: true,
                timeout: 4000
            },
            post: {
                method: 'POST',
                headers: {'Auth-Key': apiAuthKey},
                params: {jsonFile: '@jsonFile'},
                isArray: true,
                timeout: 4000
            },
            put: {
                method: 'PUT',
                headers: {'Auth-Key': apiAuthKey},
                params: {jsonFile: '@jsonFile'},
                isArray: true,
                timeout: 4000
            },
            delete: {
                method: 'DELETE',
                headers: {'Auth-Key': apiAuthKey},
                params: {jsonFile: '@jsonFile'},
                isArray: true,
                timeout: 4000
            },
            test: {
                method: 'POST',
                headers: {'Auth-Key': apiAuthKey},
                params: {jsonFile: '@jsonFile'},
                isArray: false,
                timeout: 4000
            }
        });
    }]);