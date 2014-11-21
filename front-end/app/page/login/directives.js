'use strict';

/* Directives */

app.directive('btn_logout', [function () {
        return{
            restrint: 'C',
            link: function (scope, ele, attr, ctrl) {
                attr.$set('ngClick', 'logout()');
            }
        };
    }]);