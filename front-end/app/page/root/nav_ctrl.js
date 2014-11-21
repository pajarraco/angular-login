'use strict';

/* Controllers */

app.controller('NavCtrl', ['$scope', '$location', function ($scope, $location) {

        $scope.url = $location;

    }]);
