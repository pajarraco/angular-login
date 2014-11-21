// unit test for root controller

'use strict';

(function () {
    describe('Unit: NavCtrl', function () {
        // load the app module
        beforeEach(module('cwApp'));

        var ctrl, scope, $location;

        // inject the $controller and $rootScope services
        // in the beforeEach block
        beforeEach(inject(function ($controller, $rootScope, _$location_) {
            // Create a new scope that's a child of the $rootScope
            scope = $rootScope.$new();
            // Point global variables to injected services
            $location = _$location_;
            // Create the controller
            ctrl = $controller('NavCtrl', {
                $scope: scope
            });

        }));

        it('$scope.$location must be ""',
                function () {
                    expect(scope.url.$$path).toEqual('');
                    expect($location.url()).toEqual('');
                });

    });
}());
