'use strict';

/* Filters */

app.filter('interpolate', ['version', function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    }]);

app.filter('level', [function() {
        return function(level) {
            var text_level;
            switch (level) {
                case '0':
                    text_level = 'Administrator';
                    break;
                case '1':
                    text_level = 'Sales';
                    break;
                case '2':
                    text_level = 'Designer';
                    break;
                case '3':
                    text_level = 'Developer';
                    break;
                case '4':
                    text_level = 'Client Administrator';
                    break;
                case '5':
                    text_level = 'Client';
                    break;
                default:
                    break;
            }
            return String(text_level);
        };
    }]);

app.filter('status', [function() {
        return function(state) {
            if (state == '1') {
                return 'glyphicon glyphicon-ok';
            } else {
                return 'glyphicon glyphicon-remove';
            }
        };
    }]);
