'use strict';

/* Directives */

app.directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }]);

app.directive('ensureUnique', ['RestFul', function (RestFul) {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                scope.$watch(attrs.ngModel, function () {
                    if ((attrs.ensureUnique != '') && (attrs.action == 'new')) {
                        var data = RestFul.get({
                            jsonFile: 'users.json.php',
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

app.directive('validNumber', [function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                if (attrs.validNumber === 'number') {
                    return ctrl.$parsers.push(function (value) {
                        var valid = value == null || isFinite(value);
                        ctrl.$setValidity('number', valid);
                        return valid && value != null ? Number(value) : undefined;
                    });
                }
            }
        };
    }]);

app.directive('bsPopover', [function () {
        return function (scope, element, attrs) {
            element.find("span[rel=popover]").popover({placement: 'right', html: 'true'});
            element.find("span[rel=popover]").on('shown.bs.popover', function () {
                $('body').bind('click', function () {
                    element.find("span[rel=popover]").popover('hide');
                    $('body').unbind();
                });
            });
        };
    }]);

app.directive('ngThumb', ['$window', function ($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function (item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function (file) {
                var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function (scope, element, attributes) {
                if (!helper.support)
                    return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file))
                    return;
                if (!helper.isImage(params.file))
                    return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({width: width, height: height});
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        };
    }]);