'use strict';

app.run(['$rootScope', '$location', 'loginService', function ($rootScope, $location, loginService) {
        var routespermission = ['/home', '/users'];  //route that require login
        $rootScope.$on('$locationChangeSuccess', function () {
            if (routespermission.indexOf($location.path()) !== -1) {
                loginService.islogged();
            }
        });
    }]);


