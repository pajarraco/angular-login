'use strict';

// Declare app level module which depends on filters, and services

var app = angular.module('cwApp', ['ui.router', 'ngAnimate', 'ngResource']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'page/login/login.html',
                    controller: 'LoginCtrl'
                })
                .state('users', {
                    url: '/users',
                    templateUrl: 'page/users/users.html',
                    controller: 'UsersCtrl'
                })
                .state('home', {
                    url: '/home',
                    templateUrl: 'page/home/dashboard.html',
                    controller: 'DashboardCtrl'
                })
                ;
    }]);

app.value('version', '0.1');
app.value('apiAuthKey', 'fdkgjsdt8guvn458uv458794g5vgv5vh');

