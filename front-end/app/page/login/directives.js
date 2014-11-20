'use strict';

/* Directives */

app.directive('ensureUnique', ['RestFul', function (RestFul) {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                scope.$watch(attrs.ngModel, function () {
                    if ((attrs.ensureUnique != '') && (attrs.action == 'new')) {
                        var data = RestFul.get({
                            jsonFile: 'users.json',
                            type: 'unique',
                            username: attrs.ensureUnique
                        }, function () {
                            if (data.length == 0) {
                                ctrl.$setValidity('unique', true);
                            } else {
                                ctrl.$setValidity('unique', false);
                            }
                        });
                    }
                });
            }
        };
    }]);