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
                    text_level = 'Publisher';
                    break;
                case '2':
                    text_level = 'Client';
                    break;
                default:
                    break;
            }
            return String(text_level);
        };
    }]);

app.filter('status', [function() {
        return function(status) {
            if (status === '1') {
                return 'glyphicon glyphicon-ok';
            } else {
                return 'glyphicon glyphicon-remove';
            }
        };
    }]);
