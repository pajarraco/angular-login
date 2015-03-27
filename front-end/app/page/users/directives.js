'use strict';

/* Directives */

app.directive('ensureUnique', ['RestFul', function (RestFul) {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                scope.$watch(attrs.ngModel, function () {
                    if ((attrs.ensureUnique !== '') && (attrs.action === 'new')) {
                        RestFul.get({
                            jsonFile: 'users.json',
                            type: 'unique',
                            username: attrs.ensureUnique
                        }, function (data) {
                            if (data.length === 0) {
                                ctrl.$setValidity('unique', true);
                            } else {
                                ctrl.$setValidity('unique', false);
                            }
                        });
                    } else {
                        ctrl.$setValidity('unique', true);
                    }

                });
            }
        };
    }]);

app.directive('pwCheck', [function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.pwCheck;
                elem.add(firstPassword).on('keyup', function () {
                    scope.$apply(function () {
                        var v = elem.val() === $(firstPassword).val();
                        ctrl.$setValidity('pwmatch', v);
                    });
                });
            }
        };
    }]);