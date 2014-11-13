'use strict';

/* Controllers */

app.controller('HomeCtrl', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {

        $rootScope.nav_menu = false;
        $rootScope.project = [{tittle: 'Companies'}];

        if (angular.isUndefined($rootScope.project)) {
            $rootScope.project = [{tittle: 'Companies'}];
            if (angular.isUndefined($rootScope.project.project_id)) {
                $location.path('home');
            }
        }

    }]);