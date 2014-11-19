'use strict';

// Declare app level module which depends on filters, and services

var app = angular.module('webForm', ['ui.router', 'ngAnimate', 'ngResource']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

               $urlRouterProvider.otherwise('/login');

        $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'template/root/login.html',
                    controller: 'LoginCtrl'
                })
                .state('users', {
                    url: '/users',
                    templateUrl: 'template/root/users.html',
                    controller: 'UsersCtrl'
                })
                .state('home', {
                    url: '/home',
                    views: {
                        '@': {
                            templateUrl: 'template/root/home.html',
                            controller: 'DashboardCtrl'
                        },
                        'dashboard@home': {
                            templateUrl: 'template/projects/dashboard.html',
                            controller: 'DashboardCtrl'
                        }
                    }
                })
                ;
    }]);

app.run(['$rootScope', '$location', 'loginService', function ($rootScope, $location, loginService) {
        var routespermission = ['/home', '/users'];  //route that require login
        $rootScope.$on('$locationChangeSuccess', function () {
            if (routespermission.indexOf($location.path()) != -1) {
                loginService.islogged();
            }
        });
    }]);
