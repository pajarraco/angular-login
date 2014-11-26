'use strict';

/* Directives */

app.directive('btnLogout', ['loginService', function (loginService) {
        return function (scope, ele, attr, ctrl) {
            ele.on('click', function () {
                loginService.logout();
            });
        };
    }]);