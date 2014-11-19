'use strict';

/* Controllers */

app.controller('DashboardCtrl', ['$scope', function ($scope) {

        $scope.userlevel = sessionStorage.level;
        $scope.usercompanyid = sessionStorage.company_id;

        console.log('$scope.userlevel', $scope.userlevel);
        console.log('$scope.usercompanyid', $scope.usercompanyid);

    }]);
