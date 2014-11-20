/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


describe('Unit: NavCtrl', function () {
    // Our tests will go here
    beforeEach(module('webForm'));

    var ctrl, scope;
    // inject the $controller and $rootScope services
    // in the beforeEach block
    beforeEach(inject(function ($controller, $rootScope) {
        // Create a new scope that's a child of the $rootScope
        scope = $rootScope.$new();
        // Create the controller
        ctrl = $controller('NavCtrl', {
            $scope: scope
        });
    }));

    it('$scope.$location must be ""',
            function () {
                expect(scope.url).toEqual("");
            });

});
