'use strict';

/* Services */

app.factory('UserLevel', [function () {
        return {
            getLevels: function () {
                return [
                    {key: 0, value: 'Administrator'},
                    {key: 1, value: 'Publisher'},
                    {key: 2, value: 'Client'}
                ];
            }
        };
    }]);