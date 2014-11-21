// unit test for login 
'use strict';

(function () {
    // Authentication controller Spec
    describe('Unit: login Service', function () {

        var $q,
                LoginCtrl,
                scope,
                $httpBackend,
                $location,
                mockBagelApiService,
                mockBagelsResponse;

        beforeEach(module('cwApp'));

        beforeEach(inject(function (_$q_, $controller, $rootScope, _$httpBackend_, _$location_) {

            $q = _$q_;
            scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;
            $location = _$location_;

            mockBagelApiService = {
                query: function () {
                    queryDeferred = $q.defer();
                    return {$promise: queryDeferred.promise};
                }
            };
            spyOn(mockBagelApiService, 'query').andCallThrough();

            LoginCtrl = $controller('LoginCtrl', {
                $scope: scope,
                'RestFul': mockBagelApiService
            });
        }));

        it("check login", function () {

            scope.login = {
                username: 'ernesto@cwad.com.au',
                password: '123123'
            };

            $httpBackend.when('GET', 'api/login.json').respond(200, 'authentified');

            scope.loginForm();
            $httpBackend.flush();

            expect($location.url()).toEqual('/home');

        });

    });
}());