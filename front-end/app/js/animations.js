'use strict';

/* Animations */

app.animation('.alert', function () {
    var animateDown = function (element, className, done) {
        element.css({
        });
        jQuery(element).show('slow', function () {
            var counter = 0;
            var timer = function () {
                if (counter <= 1) {
                    counter++;
                    jQuery(element).hide('slow', function () {
                        var scope = angular.element(document.querySelector('#msg')).scope();
                        scope.$apply(function () {
                            scope.alert = {active: '', classAlert: ''};
                        });
                    });
                } else {
                    clearInterval(timer);
                }
            };
            setInterval(timer, 2000);
        });
        return function (cancel) {
            if (cancel) {
                element.stop();
            }
        };
    };
    return {
        addClass: animateDown
    };
});