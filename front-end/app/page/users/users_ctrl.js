'use strict';

/* Controllers */

app.controller('UsersCtrl', ['$scope', 'RestFul', '$filter', 'UserLevel', function ($scope, RestFul, $filter, UserLevel) {

        $('#loader').show();

        $scope.userlevel = sessionStorage.level;
        $scope.userleveloption = UserLevel.getLevels();

        $scope.users = RestFul.get({
            jsonFile: 'users.json',
            type: 'all'
        }, function () {
            $('#loader').hide();
        }, function () {
            $('#loader').hide();
            $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'ERROR: Reading Users, Try Again'};
        });

        $scope.newUser = function () {
            $scope.newuser = [];
            $scope.newuser.password = '';
            $scope.newuser_form.$setPristine();
            $scope.editpanel = {tittle: 'New User', button: 'Add New', action: 'new', usernameclass: ''};
            $scope.showNewUser = true;
        };

        $scope.editUser = function (index) {
            $scope.newuser = $scope.users[index];
            if (($scope.newuser.status) === '1') {
                $scope.newuser.status = true;
            }
            $scope.newuser.password = '';
            $scope.newuser.repassword = '';
            $scope.editpanel = {tittle: 'Edit User', button: 'Save', action: 'edit', usernameclass: 'disabled'};
            $scope.showNewUser = true;
        };

        $scope.closePanel = function () {
            $scope.showNewUser = false;
            $scope.newuser = [];
            $scope.newuser_form.$setPristine();
        };

        $scope.saveUser = function () {
            $('#loader').show();
            var status = 0;
            if ($scope.newuser.status) {
                status = 1;
            }
            if ($scope.editpanel.action === 'new') {
                if ($scope.newuser.password !== '') {
                    $scope.users = RestFul.post({
                        jsonFile: 'users.json',
                        fullname: $scope.newuser.fullname,
                        username: $scope.newuser.username,
                        password: $scope.newuser.password,
                        level: $scope.newuser.level,
                        status: status
                    }, function (data) {
                        console.log('data: ', data);
                        $('#loader').hide();
                        $scope.alert = {active: 'active', classAlert: 'alert-success', msgAlert: 'User created'};
                    }, function () {
                        $('#loader').hide();
                        $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'ERROR: Creating New User, Try Again'};
                    });
                } else {
                    $('#loader').hide();
                    $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'Password Missing'};
                }
            } else {
                if ($scope.newuser.password !== '') {
                    $scope.users = RestFul.put({
                        jsonFile: 'users.json',
                        type: 'full',
                        fullname: $scope.newuser.fullname,
                        username: $scope.newuser.username,
                        password: $scope.newuser.password,
                        level: $scope.newuser.level,
                        status: status
                    }, function () {
                        $('#loader').hide();
                        $scope.alert = {active: 'active', classAlert: 'alert-success', msgAlert: 'User Saved'};
                    }, function () {
                        $('#loader').hide();
                        $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'ERROR: Saving User, Try Again'};
                    });
                } else {
                    $scope.users = RestFul.put({
                        jsonFile: 'users.json',
                        type: 'nopassword',
                        fullname: $scope.newuser.fullname,
                        username: $scope.newuser.username,
                        level: $scope.newuser.level,
                        status: status
                    }, function () {
                        $('#loader').hide();
                        $scope.alert = {active: 'active', classAlert: 'alert-success', msgAlert: 'User Saved'};
                    }, function () {
                        $('#loader').hide();
                        $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'ERROR: Saving User, Try Again'};
                    });
                }
            }
        };

        $scope.changeStatus = function (index, username, status) {
            $('#loader').show();
            if (status === '1') {
                status = 0;
                $scope.users[index].status = '0';
            } else {
                status = 1;
                $scope.users[index].status = '1';
            }
            RestFul.put({
                jsonFile: 'users.json',
                type: 'status',
                username: username,
                status: status
            }, function () {
                $('#loader').hide();
                $scope.alert = {active: 'active', classAlert: 'alert-success', msgAlert: 'Status Changed'};
            }, function () {
                $('#loader').hide();
                $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'ERROR: Changing Status, Try Again'};
            });
        };

        $scope.deleteUser = function (index, username) {
            if (confirm('You are goint to DELETE the User ' + username + '.\nAre you sure?')) {
                $('#loader').show();
                RestFul.delete({
                    jsonFile: 'users.json',
                    username: username
                }, function () {
                    $scope.users.splice(index, 1);
                    $('#loader').hide();
                    $scope.alert = {active: 'active', classAlert: 'alert-success', msgAlert: 'User Deleted'};
                }, function () {
                    $('#loader').hide();
                    $scope.alert = {active: 'active', classAlert: 'alert-danger', msgAlert: 'ERROR: Deleting User, Try Again'};
                });
            }
        };
    }]);